function clone(obj) {
    // from https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }    

    return temp;
}

var ignoredProperties = ["inspect", "nodeType", "prototype", "length"];

function defaultdict(default_factory, starting_dict){
    var handler = {
        get: function(target, name){
            if(name in target){
                return target[name];
            }else{
                const type_instance = typeof default_factory;
                if(type_instance === "function"){
                    v = default_factory(target, name);
                }else if(type_instance === "object"){
                    // be careful with objects
                    v = clone(default_factory);
                }else{
                    // number, string
                    v = default_factory;
                }
                if(name === "default_factory"){
                    // stick to the python interface
                    return default_factory;
                }
                // we need to be careful with default property calls
                else if(ignoredProperties.indexOf(name) < 0){
                    // yep defaultdict assigns the value on get
                    target[name] = v;
                    return v;
                }else{
                    //return undefined;
                }
            }
        },
        set: function(obj, prop, value){
            if(prop == "default_factory"){
                default_factory = value;
            }else{
                obj[prop] = value;
            }
        }
    };
    starting_dict = starting_dict || {};
    if("create" in Proxy){
        // Node
        return Proxy.create(starting_dict, handler);
    }else{
        // ES6 browsers
        return new Proxy(starting_dict, handler);
    }
}
module.exports = defaultdict;
