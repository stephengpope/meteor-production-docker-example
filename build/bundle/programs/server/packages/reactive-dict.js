(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;
var ECMAScript = Package.ecmascript.ECMAScript;
var babelHelpers = Package['babel-runtime'].babelHelpers;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var ReactiveDict;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/reactive-dict/reactive-dict.js                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// XXX come up with a serialization method which canonicalizes object key                                         //
// order, which would allow us to use objects as values for equals.                                               //
var stringify = function (value) {                                                                                // 3
  if (value === undefined) return 'undefined';                                                                    // 4
  return EJSON.stringify(value);                                                                                  // 6
};                                                                                                                //
var parse = function (serialized) {                                                                               // 8
  if (serialized === undefined || serialized === 'undefined') return undefined;                                   // 9
  return EJSON.parse(serialized);                                                                                 // 11
};                                                                                                                //
                                                                                                                  //
var changed = function (v) {                                                                                      // 14
  v && v.changed();                                                                                               // 15
};                                                                                                                //
                                                                                                                  //
// XXX COMPAT WITH 0.9.1 : accept migrationData instead of dictName                                               //
ReactiveDict = function (dictName) {                                                                              // 19
  // this.keys: key -> value                                                                                      //
  if (dictName) {                                                                                                 // 21
    if (typeof dictName === 'string') {                                                                           // 22
      // the normal case, argument is a string name.                                                              //
      // _registerDictForMigrate will throw an error on duplicate name.                                           //
      ReactiveDict._registerDictForMigrate(dictName, this);                                                       // 25
      this.keys = ReactiveDict._loadMigratedDict(dictName) || {};                                                 // 26
      this.name = dictName;                                                                                       // 27
    } else if (typeof dictName === 'object') {                                                                    //
      // back-compat case: dictName is actually migrationData                                                     //
      this.keys = dictName;                                                                                       // 30
    } else {                                                                                                      //
      throw new Error("Invalid ReactiveDict argument: " + dictName);                                              // 32
    }                                                                                                             //
  } else {                                                                                                        //
    // no name given; no migration will be performed                                                              //
    this.keys = {};                                                                                               // 36
  }                                                                                                               //
                                                                                                                  //
  this.allDeps = new Tracker.Dependency();                                                                        // 39
  this.keyDeps = {}; // key -> Dependency                                                                         // 40
  this.keyValueDeps = {}; // key -> Dependency                                                                    // 41
};                                                                                                                //
                                                                                                                  //
_.extend(ReactiveDict.prototype, {                                                                                // 44
  // set() began as a key/value method, but we are now overloading it                                             //
  // to take an object of key/value pairs, similar to backbone                                                    //
  // http://backbonejs.org/#Model-set                                                                             //
                                                                                                                  //
  set: function (keyOrObject, value) {                                                                            // 49
    var self = this;                                                                                              // 50
                                                                                                                  //
    if (typeof keyOrObject === 'object' && value === undefined) {                                                 // 52
      // Called as `dict.set({...})`                                                                              //
      self._setObject(keyOrObject);                                                                               // 54
      return;                                                                                                     // 55
    }                                                                                                             //
    // the input isn't an object, so it must be a key                                                             //
    // and we resume with the rest of the function                                                                //
    var key = keyOrObject;                                                                                        // 59
                                                                                                                  //
    value = stringify(value);                                                                                     // 61
                                                                                                                  //
    var keyExisted = _.has(self.keys, key);                                                                       // 63
    var oldSerializedValue = keyExisted ? self.keys[key] : 'undefined';                                           // 64
    var isNewValue = value !== oldSerializedValue;                                                                // 65
                                                                                                                  //
    self.keys[key] = value;                                                                                       // 67
                                                                                                                  //
    if (isNewValue || !keyExisted) {                                                                              // 69
      self.allDeps.changed();                                                                                     // 70
    }                                                                                                             //
                                                                                                                  //
    if (isNewValue) {                                                                                             // 73
      changed(self.keyDeps[key]);                                                                                 // 74
      if (self.keyValueDeps[key]) {                                                                               // 75
        changed(self.keyValueDeps[key][oldSerializedValue]);                                                      // 76
        changed(self.keyValueDeps[key][value]);                                                                   // 77
      }                                                                                                           //
    }                                                                                                             //
  },                                                                                                              //
                                                                                                                  //
  setDefault: function (key, value) {                                                                             // 82
    var self = this;                                                                                              // 83
    if (!_.has(self.keys, key)) {                                                                                 // 84
      self.set(key, value);                                                                                       // 85
    }                                                                                                             //
  },                                                                                                              //
                                                                                                                  //
  get: function (key) {                                                                                           // 89
    var self = this;                                                                                              // 90
    self._ensureKey(key);                                                                                         // 91
    self.keyDeps[key].depend();                                                                                   // 92
    return parse(self.keys[key]);                                                                                 // 93
  },                                                                                                              //
                                                                                                                  //
  equals: function (key, value) {                                                                                 // 96
    var self = this;                                                                                              // 97
                                                                                                                  //
    // Mongo.ObjectID is in the 'mongo' package                                                                   //
    var ObjectID = null;                                                                                          // 100
    if (Package.mongo) {                                                                                          // 101
      ObjectID = Package.mongo.Mongo.ObjectID;                                                                    // 102
    }                                                                                                             //
                                                                                                                  //
    // We don't allow objects (or arrays that might include objects) for                                          //
    // .equals, because JSON.stringify doesn't canonicalize object key                                            //
    // order. (We can make equals have the right return value by parsing the                                      //
    // current value and using EJSON.equals, but we won't have a canonical                                        //
    // element of keyValueDeps[key] to store the dependency.) You can still use                                   //
    // "EJSON.equals(reactiveDict.get(key), value)".                                                              //
    //                                                                                                            //
    // XXX we could allow arrays as long as we recursively check that there                                       //
    // are no objects                                                                                             //
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'undefined' && !(value instanceof Date) && !(ObjectID && value instanceof ObjectID) && value !== null) {
      throw new Error("ReactiveDict.equals: value must be scalar");                                               // 121
    }                                                                                                             //
    var serializedValue = stringify(value);                                                                       // 123
                                                                                                                  //
    if (Tracker.active) {                                                                                         // 125
      self._ensureKey(key);                                                                                       // 126
                                                                                                                  //
      if (!_.has(self.keyValueDeps[key], serializedValue)) self.keyValueDeps[key][serializedValue] = new Tracker.Dependency();
                                                                                                                  //
      var isNew = self.keyValueDeps[key][serializedValue].depend();                                               // 131
      if (isNew) {                                                                                                // 132
        Tracker.onInvalidate(function () {                                                                        // 133
          // clean up [key][serializedValue] if it's now empty, so we don't                                       //
          // use O(n) memory for n = values seen ever                                                             //
          if (!self.keyValueDeps[key][serializedValue].hasDependents()) delete self.keyValueDeps[key][serializedValue];
        });                                                                                                       //
      }                                                                                                           //
    }                                                                                                             //
                                                                                                                  //
    var oldValue = undefined;                                                                                     // 142
    if (_.has(self.keys, key)) oldValue = parse(self.keys[key]);                                                  // 143
    return EJSON.equals(oldValue, value);                                                                         // 144
  },                                                                                                              //
                                                                                                                  //
  all: function () {                                                                                              // 147
    this.allDeps.depend();                                                                                        // 148
    var ret = {};                                                                                                 // 149
    _.each(this.keys, function (value, key) {                                                                     // 150
      ret[key] = parse(value);                                                                                    // 151
    });                                                                                                           //
    return ret;                                                                                                   // 153
  },                                                                                                              //
                                                                                                                  //
  clear: function () {                                                                                            // 156
    var self = this;                                                                                              // 157
                                                                                                                  //
    var oldKeys = self.keys;                                                                                      // 159
    self.keys = {};                                                                                               // 160
                                                                                                                  //
    self.allDeps.changed();                                                                                       // 162
                                                                                                                  //
    _.each(oldKeys, function (value, key) {                                                                       // 164
      changed(self.keyDeps[key]);                                                                                 // 165
      changed(self.keyValueDeps[key][value]);                                                                     // 166
      changed(self.keyValueDeps[key]['undefined']);                                                               // 167
    });                                                                                                           //
  },                                                                                                              //
                                                                                                                  //
  'delete': function (key) {                                                                                      // 172
    var self = this;                                                                                              // 173
    var didRemove = false;                                                                                        // 174
                                                                                                                  //
    if (_.has(self.keys, key)) {                                                                                  // 176
      var oldValue = self.keys[key];                                                                              // 177
      delete self.keys[key];                                                                                      // 178
      changed(self.keyDeps[key]);                                                                                 // 179
      if (self.keyValueDeps[key]) {                                                                               // 180
        changed(self.keyValueDeps[key][oldValue]);                                                                // 181
        changed(self.keyValueDeps[key]['undefined']);                                                             // 182
      }                                                                                                           //
      self.allDeps.changed();                                                                                     // 184
      didRemove = true;                                                                                           // 185
    }                                                                                                             //
                                                                                                                  //
    return didRemove;                                                                                             // 188
  },                                                                                                              //
                                                                                                                  //
  _setObject: function (object) {                                                                                 // 191
    var self = this;                                                                                              // 192
                                                                                                                  //
    _.each(object, function (value, key) {                                                                        // 194
      self.set(key, value);                                                                                       // 195
    });                                                                                                           //
  },                                                                                                              //
                                                                                                                  //
  _ensureKey: function (key) {                                                                                    // 199
    var self = this;                                                                                              // 200
    if (!(key in self.keyDeps)) {                                                                                 // 201
      self.keyDeps[key] = new Tracker.Dependency();                                                               // 202
      self.keyValueDeps[key] = {};                                                                                // 203
    }                                                                                                             //
  },                                                                                                              //
                                                                                                                  //
  // Get a JSON value that can be passed to the constructor to                                                    //
  // create a new ReactiveDict with the same contents as this one                                                 //
  _getMigrationData: function () {                                                                                // 209
    // XXX sanitize and make sure it's JSONible?                                                                  //
    return this.keys;                                                                                             // 211
  }                                                                                                               //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/reactive-dict/migration.js                                                                            //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
ReactiveDict._migratedDictData = {}; // name -> data                                                              // 1
ReactiveDict._dictsToMigrate = {}; // name -> ReactiveDict                                                        // 2
                                                                                                                  //
ReactiveDict._loadMigratedDict = function (dictName) {                                                            // 4
  if (_.has(ReactiveDict._migratedDictData, dictName)) return ReactiveDict._migratedDictData[dictName];           // 5
                                                                                                                  //
  return null;                                                                                                    // 8
};                                                                                                                //
                                                                                                                  //
ReactiveDict._registerDictForMigrate = function (dictName, dict) {                                                // 11
  if (_.has(ReactiveDict._dictsToMigrate, dictName)) throw new Error("Duplicate ReactiveDict name: " + dictName);
                                                                                                                  //
  ReactiveDict._dictsToMigrate[dictName] = dict;                                                                  // 15
};                                                                                                                //
                                                                                                                  //
if (Meteor.isClient && Package.reload) {                                                                          // 18
  // Put old migrated data into ReactiveDict._migratedDictData,                                                   //
  // where it can be accessed by ReactiveDict._loadMigratedDict.                                                  //
  var migrationData = Package.reload.Reload._migrationData('reactive-dict');                                      // 21
  if (migrationData && migrationData.dicts) ReactiveDict._migratedDictData = migrationData.dicts;                 // 22
                                                                                                                  //
  // On migration, assemble the data from all the dicts that have been                                            //
  // registered.                                                                                                  //
  Package.reload.Reload._onMigrate('reactive-dict', function () {                                                 // 27
    var dictsToMigrate = ReactiveDict._dictsToMigrate;                                                            // 28
    var dataToMigrate = {};                                                                                       // 29
                                                                                                                  //
    for (var dictName in babelHelpers.sanitizeForInObject(dictsToMigrate)) dataToMigrate[dictName] = dictsToMigrate[dictName]._getMigrationData();
                                                                                                                  //
    return [true, { dicts: dataToMigrate }];                                                                      // 34
  });                                                                                                             //
}                                                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reactive-dict'] = {
  ReactiveDict: ReactiveDict
};

})();

//# sourceMappingURL=reactive-dict.js.map
