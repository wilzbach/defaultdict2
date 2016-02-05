try{
    // see whether proxy is available
    var handler = {
        get: function(target, name){}
    };
    Proxy.create({}, handler);
}catch(e){
    // hack to enable the harmony-proxies flag by default
    require("harmonize")(["harmony-proxies"]);
}
// hack to shim proxies on node
// TODO: look at nodes' proxy API and see whether this shim is needed
require("harmony-reflect");
var defaultdict = require('./src/index.js');
module.exports = defaultdict;
