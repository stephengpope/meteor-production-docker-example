(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/routes.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.configure({                                                     // 1
  layoutTemplate: 'MasterLayout',                                      // 2
  loadingTemplate: 'Loading',                                          // 3
  notFoundTemplate: 'NotFound'                                         // 4
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 8
  name: 'home',                                                        // 9
  controller: 'HomeController',                                        // 10
  where: 'client'                                                      // 11
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routes.js.map
