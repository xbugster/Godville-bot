kango.registerModule(function(a){var b=new kango.MessageRouter;a.dispatchMessage=function(a,c){b.dispatchMessage(a,c)};this.dispose=function(){b=a.dispatchMessage=null}});
