var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
  return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for (var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
  }
};
goog.define = function(a, b) {
  var c = b;
  COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
  goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.provide = function(a) {
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var c = a;(c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
      goog.implicitNamespaces_[c] = !0;
    }
  }
  goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareTestMethods = function() {
  if (!goog.isInModuleLoader_()) {
    throw Error("goog.module.declareTestMethods must be called from within a goog.module");
  }
  goog.moduleLoaderState_.declareTestMethods = !0;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  for (var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if (goog.isDefAndNotNull(d[e])) {
      d = d[e];
    } else {
      return null;
    }
  }
  return d;
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for (d in a) {
    c[d] = a[d];
  }
};
goog.addDependency = function(a, b, c, d) {
  if (goog.DEPENDENCIES_ENABLED) {
    var e;
    a = a.replace(/\\/g, "/");
    for (var f = goog.dependencies_, g = 0;e = b[g];g++) {
      f.nameToPath[e] = a, f.pathIsModule[a] = !!d;
    }
    for (d = 0;b = c[d];d++) {
      a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
    if (goog.isProvided_(a)) {
      return goog.isInModuleLoader_() ? goog.module.getInternal_(a) : null;
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if (b) {
        return goog.included_[b] = !0, goog.writeScripts_(), null;
      }
    }
    a = "goog.require could not find: " + a;
    goog.logToConsole_(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a, b) {
  return a;
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.included_ = {}, goog.dependencies_ = {pathIsModule:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return "undefined" != typeof a && "write" in a;
}, goog.findBasePath_ = function() {
  if (goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function(a, b) {
  (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = goog.global.document && goog.global.document.all && !goog.global.atob, goog.importModule_ = function(a) {
  goog.importScript_("", 'goog.retrieveAndExecModule_("' + a + '");') && (goog.dependencies_.written[a] = !0);
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
  var a = goog.queuedModules_.length;
  if (0 < a) {
    var b = goog.queuedModules_;
    goog.queuedModules_ = [];
    for (var c = 0;c < a;c++) {
      goog.maybeProcessDeferredPath_(b[c]);
    }
  }
}, goog.maybeProcessDeferredDep_ = function(a) {
  goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
  return(a = goog.getPathFromDeps_(a)) && goog.dependencies_.pathIsModule[a] ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
  if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
    for (var b in goog.dependencies_.requires[a]) {
      if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
        return!1;
      }
    }
  }
  return!0;
}, goog.maybeProcessDeferredPath_ = function(a) {
  if (a in goog.dependencies_.deferred) {
    var b = goog.dependencies_.deferred[a];
    delete goog.dependencies_.deferred[a];
    goog.globalEval(b);
  }
}, goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:void 0, declareTestMethods:!1};
    var c;
    if (goog.isFunction(a)) {
      c = a.call(goog.global, {});
    } else {
      if (goog.isString(a)) {
        c = goog.loadModuleFromSource_.call(goog.global, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var d = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(d) || !d) {
      throw Error('Invalid module name "' + d + '"');
    }
    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(c);
    goog.loadedModules_[d] = c;
    if (goog.moduleLoaderState_.declareTestMethods) {
      for (var e in c) {
        if (0 === e.indexOf("test", 0) || "tearDown" == e || "setUp" == e || "setUpPage" == e || "tearDownPage" == e) {
          goog.global[e] = c[e];
        }
      }
    }
  } finally {
    goog.moduleLoaderState_ = b;
  }
}, goog.loadModuleFromSource_ = function(a) {
  eval(a);
  return{};
}, goog.writeScriptTag_ = function(a, b) {
  if (goog.inHtmlDocument_()) {
    var c = goog.global.document;
    if ("complete" == c.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return!1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    var d = goog.IS_OLD_IE_;
    void 0 === b ? d ? (d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>")) : c.write('<script type="text/javascript" src="' + a + '">\x3c/script>') : c.write('<script type="text/javascript">' + b + "\x3c/script>");
    return!0;
  }
  return!1;
}, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
  "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
  return!0;
}, goog.writeScripts_ = function() {
  function a(e) {
    if (!(e in d.written)) {
      if (!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for (var f in d.requires[e]) {
          if (!goog.isProvided_(f)) {
            if (f in d.nameToPath) {
              a(d.nameToPath[f]);
            } else {
              throw Error("Undefined nameToPath for " + f);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e));
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for (e in goog.included_) {
    d.written[e] || a(e);
  }
  for (var f = 0;f < b.length;f++) {
    e = b[f], goog.dependencies_.written[e] = !0;
  }
  var g = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (f = 0;f < b.length;f++) {
    if (e = b[f]) {
      d.pathIsModule[e] ? goog.importModule_(goog.basePath + e) : goog.importScript_(goog.basePath + e);
    } else {
      throw goog.moduleLoaderState_ = g, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0;b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.retrieveAndExecModule_ = function(a) {
  if (!COMPILED) {
    var b = a;
    a = goog.normalizePath_(a);
    var c = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, d = null, e = new goog.global.XMLHttpRequest;
    e.onload = function() {
      d = this.responseText;
    };
    e.open("get", a, !1);
    e.send();
    d = e.responseText;
    if (null != d) {
      e = goog.wrapModule_(a, d), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[b] = e, goog.queuedModules_.push(b)) : c(a, e);
    } else {
      throw Error("load of " + a + "failed");
    }
  }
};
goog.typeOf = function(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
};
goog.isNull = function(a) {
  return null === a;
};
goog.isDefAndNotNull = function(a) {
  return null != a;
};
goog.isArray = function(a) {
  return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
  return "string" == typeof a;
};
goog.isBoolean = function(a) {
  return "boolean" == typeof a;
};
goog.isNumber = function(a) {
  return "number" == typeof a;
};
goog.isFunction = function(a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return!!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
};
goog.mixin = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function(a) {
  if (goog.global.execScript) {
    goog.global.execScript(a, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a);
      } else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a;
  }, d = function(a) {
    a = a.split("-");
    for (var b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]));
    }
    return b.join("-");
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a;
  };
  return b ? a + "-" + d(b) : d(a);
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
    return d in b ? b[d] : a;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
    for (var g = Array(arguments.length - 2), h = 2;h < arguments.length;h++) {
      g[h - 2] = arguments[h];
    }
    return b.prototype[c].apply(a, g);
  };
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1;f < arguments.length;f++) {
      e[f - 1] = arguments[f];
    }
    return d.superClass_.constructor.apply(a, e);
  }
  e = Array(arguments.length - 2);
  for (f = 2;f < arguments.length;f++) {
    e[f - 2] = arguments[f];
  }
  for (var f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if (g.prototype[b] === d) {
      f = !0;
    } else {
      if (f) {
        return g.prototype[b].apply(a, e);
      }
    }
  }
  if (a[b] === d) {
    return a.constructor.prototype[b].apply(a, e);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
    if (b && b.prototype && b.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) {
      return a;
    }
    var c = function() {
      var b = a.apply(this, arguments) || this;
      b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
      this.constructor === c && Object.seal(b);
      return b;
    };
    return c;
  }
  return a;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0;d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.tagUnsealableClass = function(a) {
  !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.debug = {};
goog.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
  return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
  return/^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
  return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
  return " " == a;
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if (a == b) {
    return 0;
  }
  if (!a) {
    return-1;
  }
  if (!b) {
    return 1;
  }
  for (var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if (g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1;
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1;
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
  if (b) {
    a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
  }
  return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
  return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
  var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, d;
  d = b ? b.createElement("div") : goog.global.document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
    var g = c[a];
    if (g) {
      return g;
    }
    if ("#" == b.charAt(0)) {
      var h = Number("0" + b.substr(1));
      isNaN(h) || (g = String.fromCharCode(h));
    }
    g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
    return c[a] = g;
  });
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return'"';
      default:
        if ("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if (!isNaN(d)) {
            return String.fromCharCode(d);
          }
        }
        return a;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
  for (var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if (d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e);
  } else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
  }
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if (a.quote) {
    return a.quote();
  }
  for (var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
  }
  b.push('"');
  return b.join("");
};
goog.string.escapeString = function(a) {
  for (var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c));
  }
  return b.join("");
};
goog.string.escapeChar = function(a) {
  if (a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a];
  }
  if (a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
  }
  var b = a, c = a.charCodeAt(0);
  if (31 < c && 127 > c) {
    b = a;
  } else {
    if (256 > c) {
      if (b = "\\x", 16 > c || 256 < c) {
        b += "0";
      }
    } else {
      b = "\\u", 4096 > c && (b += "0");
    }
    b += c.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[a] = b;
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
  return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d;
};
goog.string.remove = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "");
};
goog.string.removeAll = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "");
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
  for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", m = e[g] || "", u = RegExp("(\\d*)(\\D*)", "g"), E = RegExp("(\\d*)(\\D*)", "g");
    do {
      var A = u.exec(h) || ["", "", ""], y = E.exec(m) || ["", "", ""];
      if (0 == A[0].length && 0 == y[0].length) {
        break;
      }
      var c = 0 == A[1].length ? 0 : parseInt(A[1], 10), C = 0 == y[1].length ? 0 : parseInt(y[1], 10), c = goog.string.compareElements_(c, C) || goog.string.compareElements_(0 == A[2].length, 0 == y[2].length) || goog.string.compareElements_(A[2], y[2]);
    } while (0 == c);
  }
  return c;
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for (var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_;
  }
  return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
  return/^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
  return/^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase();
  });
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase();
  });
};
goog.string.capitalize = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
  a = a.split(b);
  for (var d = [];0 < c && a.length;) {
    d.push(a.shift()), c--;
  }
  a.length && d.push(a.join(b));
  return d;
};
goog.string.editDistance = function(a, b) {
  var c = [], d = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var e = 0;e < b.length + 1;e++) {
    c[e] = e;
  }
  for (e = 0;e < a.length;e++) {
    d[0] = e + 1;
    for (var f = 0;f < b.length;f++) {
      d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + (a[e] != b[f]));
    }
    for (f = 0;f < c.length;f++) {
      c[f] = d[f];
    }
  }
  return d[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
  throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if (c) {
    var e = e + (": " + c), f = d
  } else {
    a && (e += ": " + a, f = b);
  }
  a = new goog.asserts.AssertionError("" + e, f || []);
  goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.fail = function(a, b) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertElement = function(a, b, c) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
  return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var a in Object.prototype) {
    goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
  return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
  }
  for (;0 <= c;c--) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a);
  }
};
goog.array.forEachRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if (h in g) {
      var m = g[h];
      b.call(c, m, h, a) && (e[f++] = m);
    }
  }
  return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a));
  }
  return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return goog.array.ARRAY_PROTOTYPE_.reduce.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return goog.array.ARRAY_PROTOTYPE_.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return!0;
    }
  }
  return!1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && !b.call(c, e[f], f, a)) {
      return!1;
    }
  }
  return!0;
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d;
  }, c);
  return d;
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return f;
    }
  }
  return-1;
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if (d in e && b.call(c, e[d], d, a)) {
      return d;
    }
  }
  return-1;
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
  return 0 == a.length;
};
goog.array.clear = function(a) {
  if (!goog.isArray(a)) {
    for (var b = a.length - 1;0 <= b;b--) {
      delete a[b];
    }
  }
  a.length = 0;
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d;
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
  var d = 0;
  goog.array.forEachRight(a, function(e, f) {
    b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
  });
  return d;
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.join = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments);
};
goog.array.toArray = function(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return[];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for (var c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    if (goog.isArrayLike(d)) {
      var e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (var g = 0;g < f;g++) {
        a[e + g] = d[g];
      }
    } else {
      a.push(d);
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
  b = b || a;
  var d = function(a) {
    return goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
  };
  c = c || d;
  for (var d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = c(g);
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
  }
  b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for (var f = 0, g = a.length, h;f < g;) {
    var m = f + g >> 1, u;
    u = c ? b.call(e, a[m], m, a) : b(d, a[m]);
    0 < u ? f = m + 1 : (g = m, h = !u);
  }
  return h ? f : ~f;
};
goog.array.sort = function(a, b) {
  a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
  for (var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]};
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index;
  });
  for (c = 0;c < a.length;c++) {
    a[c] = a[c].value;
  }
};
goog.array.sortByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(b(a), b(c));
  });
};
goog.array.sortObjectsByKey = function(a, b, c) {
  goog.array.sortByKey(a, function(a) {
    return a[b];
  }, c);
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for (var d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if (0 < e || 0 == e && c) {
      return!1;
    }
  }
  return!0;
};
goog.array.equals = function(a, b, c) {
  if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1;
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for (var e = 0;e < d;e++) {
    if (!c(a[e], b[e])) {
      return!1;
    }
  }
  return!0;
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for (var d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if (0 != f) {
      return f;
    }
  }
  return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
  for (var d = {}, e = 0;e < a.length;e++) {
    var f = a[e], g = b.call(c, f, e, a);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
  }
  return d;
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e;
  });
  return d;
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if (0 > c * (f - e)) {
    return[];
  }
  if (0 < c) {
    for (a = e;a < f;a += c) {
      d.push(a);
    }
  } else {
    for (a = e;a > f;a += c) {
      d.push(a);
    }
  }
  return d;
};
goog.array.repeat = function(a, b) {
  for (var c = [], d = 0;d < b;d++) {
    c[d] = a;
  }
  return c;
};
goog.array.flatten = function(a) {
  for (var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    if (goog.isArray(d)) {
      for (var e = 0;e < d.length;e += 8192) {
        for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0;g < f.length;g++) {
          b.push(f[g]);
        }
      }
    } else {
      b.push(d);
    }
  }
  return b;
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a;
};
goog.array.moveItem = function(a, b, c) {
  goog.asserts.assert(0 <= b && b < a.length);
  goog.asserts.assert(0 <= c && c < a.length);
  b = goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1);
  goog.array.ARRAY_PROTOTYPE_.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
  if (!arguments.length) {
    return[];
  }
  for (var b = [], c = 0;;c++) {
    for (var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if (c >= f.length) {
        return b;
      }
      d.push(f[c]);
    }
    b.push(d);
  }
};
goog.array.shuffle = function(a, b) {
  for (var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f;
  }
};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
  a.className = b;
};
goog.dom.classes.get = function(a) {
  a = a.className;
  return goog.isString(a) && a.match(/\S+/g) || [];
};
goog.dom.classes.add = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), e = c.length + d.length;
  goog.dom.classes.add_(c, d);
  goog.dom.classes.set(a, c.join(" "));
  return c.length == e;
};
goog.dom.classes.remove = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), e = goog.dom.classes.getDifference_(c, d);
  goog.dom.classes.set(a, e.join(" "));
  return e.length == c.length - d.length;
};
goog.dom.classes.add_ = function(a, b) {
  for (var c = 0;c < b.length;c++) {
    goog.array.contains(a, b[c]) || a.push(b[c]);
  }
};
goog.dom.classes.getDifference_ = function(a, b) {
  return goog.array.filter(a, function(a) {
    return!goog.array.contains(b, a);
  });
};
goog.dom.classes.swap = function(a, b, c) {
  for (var d = goog.dom.classes.get(a), e = !1, f = 0;f < d.length;f++) {
    d[f] == b && (goog.array.splice(d, f--, 1), e = !0);
  }
  e && (d.push(c), goog.dom.classes.set(a, d.join(" ")));
  return e;
};
goog.dom.classes.addRemove = function(a, b, c) {
  var d = goog.dom.classes.get(a);
  goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && (d = goog.dom.classes.getDifference_(d, b));
  goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
  goog.dom.classes.set(a, d.join(" "));
};
goog.dom.classes.has = function(a, b) {
  return goog.array.contains(goog.dom.classes.get(a), b);
};
goog.dom.classes.enable = function(a, b, c) {
  c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b);
};
goog.dom.classes.toggle = function(a, b) {
  var c = !goog.dom.classes.has(a, b);
  goog.dom.classes.enable(a, b, c);
  return c;
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for (var d in a) {
    b.call(c, a[d], d, a);
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e]);
  }
  return d;
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    d[e] = b.call(c, a[e], e, a);
  }
  return d;
};
goog.object.some = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return!0;
    }
  }
  return!1;
};
goog.object.every = function(a, b, c) {
  for (var d in a) {
    if (!b.call(c, a[d], d, a)) {
      return!1;
    }
  }
  return!0;
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for (c in a) {
    b++;
  }
  return b;
};
goog.object.getAnyKey = function(a) {
  for (var b in a) {
    return b;
  }
};
goog.object.getAnyValue = function(a) {
  for (var b in a) {
    return a[b];
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
};
goog.object.getValueByKeys = function(a, b) {
  for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && (a = a[d[c]], goog.isDef(a));c++) {
  }
  return a;
};
goog.object.containsKey = function(a, b) {
  return b in a;
};
goog.object.containsValue = function(a, b) {
  for (var c in a) {
    if (a[c] == b) {
      return!0;
    }
  }
  return!1;
};
goog.object.findKey = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return d;
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
  for (var b in a) {
    return!1;
  }
  return!0;
};
goog.object.clear = function(a) {
  for (var b in a) {
    delete a[b];
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c;
};
goog.object.add = function(a, b, c) {
  if (b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
  a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
  if (b in a) {
    return a[b];
  }
  c = c();
  return a[b] = c;
};
goog.object.equals = function(a, b) {
  for (var c in a) {
    if (!(c in b) || a[c] !== b[c]) {
      return!1;
    }
  }
  for (c in b) {
    if (!(c in a)) {
      return!1;
    }
  }
  return!0;
};
goog.object.clone = function(a) {
  var b = {}, c;
  for (c in a) {
    b[c] = a[c];
  }
  return b;
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.object.unsafeClone(a[c]);
    }
    return b;
  }
  return a;
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for (c in a) {
    b[a[c]] = c;
  }
  return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (b % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1];
  }
  return c;
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0;
  }
  return c;
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b;
};
goog.object.isImmutableView = function(a) {
  return!!Object.isFrozen && Object.isFrozen(a);
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c);
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c;
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a);
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1E-6);
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360);
};
goog.math.standardAngleInRadians = function(a) {
  return goog.math.modulo(a, 2 * Math.PI);
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180;
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI;
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a));
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a));
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)));
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c;
};
goog.math.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1;
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  c = c || function(a, b) {
    return a == b;
  };
  d = d || function(b, c) {
    return a[b];
  };
  for (var e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0;
  }
  for (var m = 0;m < f + 1;m++) {
    g[0][m] = 0;
  }
  for (h = 1;h <= e;h++) {
    for (m = 1;m <= f;m++) {
      c(a[h - 1], b[m - 1]) ? g[h][m] = g[h - 1][m - 1] + 1 : g[h][m] = Math.max(g[h - 1][m], g[h][m - 1]);
    }
  }
  for (var u = [], h = e, m = f;0 < h && 0 < m;) {
    c(a[h - 1], b[m - 1]) ? (u.unshift(d(h - 1, m - 1)), h--, m--) : g[h - 1][m] > g[h][m - 1] ? h-- : m--;
  }
  return u;
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c;
  }, 0);
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(a) {
  var b = arguments.length;
  if (2 > b) {
    return 0;
  }
  var c = goog.math.average.apply(null, arguments);
  return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2);
  })) / (b - 1);
};
goog.math.standardDeviation = function(a) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1;
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a);
};
goog.math.log10Floor = function(a) {
  if (0 < a) {
    var b = Math.round(Math.log(a) * Math.LOG10E);
    return b - (parseFloat("1e" + b) > a);
  }
  return 0 == a ? -Infinity : NaN;
};
goog.math.safeFloor = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.floor(a + (b || 2E-15));
};
goog.math.safeCeil = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.ceil(a - (b || 2E-15));
};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0;
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d);
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d;
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += a, goog.isNumber(b) && (this.y += b));
  return this;
};
goog.math.Coordinate.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.x *= a;
  this.y *= c;
  return this;
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
  var c = b || new goog.math.Coordinate(0, 0), d = this.x, e = this.y, f = Math.cos(a), g = Math.sin(a);
  this.x = (d - c.x) * f - (e - c.y) * g + c.x;
  this.y = (d - c.x) * g + (e - c.y) * f + c.y;
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
  this.rotateRadians(goog.math.toRadians(a), b);
};
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d;
};
goog.math.Box.boundingBox = function(a) {
  for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    b.top = Math.min(b.top, d.y);
    b.right = Math.max(b.right, d.x);
    b.bottom = Math.max(b.bottom, d.y);
    b.left = Math.min(b.left, d.x);
  }
  return b;
};
goog.math.Box.prototype.getWidth = function() {
  return this.right - this.left;
};
goog.math.Box.prototype.getHeight = function() {
  return this.bottom - this.top;
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
  return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
});
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a);
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
  return this;
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom);
};
goog.math.Box.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1;
};
goog.math.Box.contains = function(a, b) {
  return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1;
};
goog.math.Box.relativePositionX = function(a, b) {
  return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0;
};
goog.math.Box.relativePositionY = function(a, b) {
  return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0;
};
goog.math.Box.distance = function(a, b) {
  var c = goog.math.Box.relativePositionX(a, b), d = goog.math.Box.relativePositionY(a, b);
  return Math.sqrt(c * c + d * d);
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c;
};
goog.math.Box.prototype.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Box.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
  return this;
};
goog.math.Box.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.right *= a;
  this.top *= c;
  this.bottom *= c;
  return this;
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var a = goog.labs.userAgent.util.getNavigator_();
  return a && (a = a.userAgent) ? a : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
  goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(b, a);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(b, a);
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
  for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d;d = b.exec(a);) {
    c.push([d[1], d[2], d[3] || void 0]);
  }
  return c;
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent(), b = "";
  goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && 
  (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
  return b || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS") && !goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return(goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS");
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return!goog.labs.userAgent.browser.isChrome() && goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function a(a) {
    a = goog.array.find(a, d);
    return c[a] || "";
  }
  var b = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(b);
  }
  var b = goog.labs.userAgent.util.extractVersionTuples(b), c = {};
  goog.array.forEach(b, function(a) {
    c[a[0]] = a[1];
  });
  var d = goog.partial(goog.object.containsKey, c);
  return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera", "OPR"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
  var b = /rv: *([\d\.]*)/.exec(a);
  if (b && b[1]) {
    return b[1];
  }
  var b = "", c = /MSIE +([\d\.]+)/.exec(a);
  if (c && c[1]) {
    if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) {
      if (a && a[1]) {
        switch(a[1]) {
          case "4.0":
            b = "8.0";
            break;
          case "5.0":
            b = "9.0";
            break;
          case "6.0":
            b = "10.0";
            break;
          case "7.0":
            b = "11.0";
        }
      } else {
        b = "7.0";
      }
    } else {
      b = c[1];
    }
  }
  return b;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit");
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident();
};
goog.labs.userAgent.engine.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  if (a) {
    var a = goog.labs.userAgent.util.extractVersionTuples(a), b = a[1];
    if (b) {
      return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
    }
    var a = a[0], c;
    if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) {
      return c[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
  var c = goog.array.find(a, function(a) {
    return b == a[0];
  });
  return c && c[1] || "";
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var a = goog.userAgent.getNavigator();
  return!!a && goog.string.contains(a.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  if (goog.userAgent.OPERA && goog.global.opera) {
    return a = goog.global.opera.version, goog.isFunction(a) ? a() : a;
  }
  goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/);
  b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : "");
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a;
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[a] || (goog.userAgent.isVersionOrHigherCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a));
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
  return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= a;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var a = goog.global.document;
  return a && goog.userAgent.IE ? goog.userAgent.getDocumentMode_() || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0;
}();
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b;
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height);
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height);
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height;
};
goog.math.Size.prototype.perimeter = function() {
  return 2 * (this.width + this.height);
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area();
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height;
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Size.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.width *= a;
  this.height *= c;
  return this;
};
goog.math.Size.prototype.scaleToFit = function(a) {
  a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a);
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d;
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left);
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top);
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
  return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
});
goog.math.Rect.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1;
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if (b <= c) {
    var d = Math.max(this.top, a.top);
    a = Math.min(this.top + this.height, a.top + a.height);
    if (d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0;
    }
  }
  return!1;
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if (c <= d) {
    var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
    if (e <= f) {
      return new goog.math.Rect(c, e, d - c, f - e);
    }
  }
  return null;
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a);
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if (!c || !c.height || !c.width) {
    return[a.clone()];
  }
  var c = [], d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, m = b.top + b.height;
  b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
  m < g && (c.push(new goog.math.Rect(a.left, m, a.width, g - m)), e = m - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
  h < f && c.push(new goog.math.Rect(h, d, f - h, e));
  return c;
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a);
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top;
};
goog.math.Rect.boundingRect = function(a, b) {
  if (!a || !b) {
    return null;
  }
  var c = a.clone();
  c.boundingRect(b);
  return c;
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height;
};
goog.math.Rect.prototype.squaredDistance = function(a) {
  var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
  a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
  return b * b + a * a;
};
goog.math.Rect.prototype.distance = function(a) {
  return Math.sqrt(this.squaredDistance(a));
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.getTopLeft = function() {
  return new goog.math.Coordinate(this.left, this.top);
};
goog.math.Rect.prototype.getCenter = function() {
  return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2);
};
goog.math.Rect.prototype.getBottomRight = function() {
  return new goog.math.Coordinate(this.left + this.width, this.top + this.height);
};
goog.math.Rect.prototype.ceil = function() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Rect.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += a, goog.isNumber(b) && (this.top += b));
  return this;
};
goog.math.Rect.prototype.scale = function(a, b) {
  var c = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.width *= a;
  this.top *= c;
  this.height *= c;
  return this;
};
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null;
};
goog.dom.vendor.getVendorPrefix = function() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null;
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
  if (b && a in b) {
    return a;
  }
  var c = goog.dom.vendor.getVendorJsPrefix();
  return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), !goog.isDef(b) || c in b ? c : null) : null;
};
goog.dom.vendor.getPrefixedEventType = function(a) {
  return((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase();
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", ARTICLE:"ARTICLE", ASIDE:"ASIDE", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDI:"BDI", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", COMMAND:"COMMAND", DATA:"DATA", DATALIST:"DATALIST", DD:"DD", DEL:"DEL", DETAILS:"DETAILS", DFN:"DFN", 
DIALOG:"DIALOG", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", EMBED:"EMBED", FIELDSET:"FIELDSET", FIGCAPTION:"FIGCAPTION", FIGURE:"FIGURE", FONT:"FONT", FOOTER:"FOOTER", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HEADER:"HEADER", HGROUP:"HGROUP", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", KEYGEN:"KEYGEN", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", 
MAP:"MAP", MARK:"MARK", MATH:"MATH", MENU:"MENU", META:"META", METER:"METER", NAV:"NAV", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", OUTPUT:"OUTPUT", P:"P", PARAM:"PARAM", PRE:"PRE", PROGRESS:"PROGRESS", Q:"Q", RP:"RP", RT:"RT", RUBY:"RUBY", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SECTION:"SECTION", SELECT:"SELECT", SMALL:"SMALL", SOURCE:"SOURCE", SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUMMARY:"SUMMARY", 
SUP:"SUP", SVG:"SVG", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TIME:"TIME", TITLE:"TITLE", TR:"TR", TRACK:"TRACK", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO", WBR:"WBR"};
goog.string.TypedString = function() {
};
goog.string.Const = function() {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.string.Const.prototype.toString = function() {
  return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
};
goog.string.Const.unwrap = function(a) {
  if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + a + "'");
  return "type_error:Const";
};
goog.string.Const.from = function(a) {
  return goog.string.Const.create__googStringSecurityPrivate_(a);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
  var b = new goog.string.Const;
  b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
  return b;
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 
2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {LRE:"\u202a", RLE:"\u202b", PDF:"\u202c", LRM:"\u200e", RLM:"\u200f"};
goog.i18n.bidi.Dir = {LTR:1, RTL:-1, NEUTRAL:0};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
  return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
  return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a;
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
  return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
  return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
  return goog.i18n.bidi.rtlRe_.test(a);
};
goog.i18n.bidi.isLtrChar = function(a) {
  return goog.i18n.bidi.ltrRe_.test(a);
};
goog.i18n.bidi.isNeutralChar = function(a) {
  return!goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a);
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
  a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
  return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a);
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
  return goog.i18n.bidi.rtlLocalesRe_.test(a);
};
goog.i18n.bidi.bracketGuardHtmlRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)/g;
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInHtml = function(a, b) {
  return(void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? a.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=rtl>$&</span>") : a.replace(goog.i18n.bidi.bracketGuardHtmlRe_, "<span dir=ltr>$&</span>");
};
goog.i18n.bidi.guardBracketInText = function(a, b) {
  var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
  return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c);
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
};
goog.i18n.bidi.enforceRtlInText = function(a) {
  return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
};
goog.i18n.bidi.enforceLtrInText = function(a) {
  return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
  return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
  return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3");
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /\d/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
  for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0;g < f.length;g++) {
    var h = f[g];
    goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0);
  }
  return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
  return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL;
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
  a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
};
goog.i18n.bidi.DirectionalString = function() {
};
goog.html = {};
goog.html.SafeUrl = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
  return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeUrl.unwrap = function(a) {
  if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeUrl, got '" + a + "'");
  return "type_error:SafeUrl";
};
goog.html.SafeUrl.fromConstant = function(a) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
  if (a instanceof goog.html.SafeUrl) {
    return a;
  }
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  a = goog.html.SAFE_URL_PATTERN_.test(a) ? goog.html.SafeUrl.normalize_(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeUrl.normalize_ = function(a) {
  try {
    var b = encodeURI(a);
  } catch (c) {
    return goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return b.replace(goog.html.SafeUrl.NORMALIZE_MATCHER_, function(a) {
    return goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_[a];
  });
};
goog.html.SafeUrl.NORMALIZE_MATCHER_ = /[()']|%5B|%5D|%25/g;
goog.html.SafeUrl.NORMALIZE_REPLACER_MAP_ = {"'":"%27", "(":"%28", ")":"%29", "%5B":"[", "%5D":"]", "%25":"%"};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.SafeUrl;
  b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  return b;
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = goog.object.createSet("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
goog.dom.tags.isVoidTag = function(a) {
  return!0 === goog.dom.tags.VOID_TAGS_[a];
};
goog.html.SafeStyle = function() {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
  this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(a);
  goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
  goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyle.checkStyle_ = function(a) {
  goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a);
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
  return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
});
goog.html.SafeStyle.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyle, got '" + a + "'");
  return "type_error:SafeStyle";
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.SafeStyle;
  b.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
  return b;
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
  var b = "", c;
  for (c in a) {
    if (!/^[-_a-zA-Z0-9]+$/.test(c)) {
      throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
    }
    var d = a[c];
    null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) || (goog.asserts.fail("String value allows only [-.%_!# a-zA-Z0-9], got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING), b += c + ":" + d + ";");
  }
  if (!b) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(b);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyle.VALUE_RE_ = /^[-.%_!# a-zA-Z0-9]+$/;
goog.html.SafeStyle.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
};
goog.html.TrustedResourceUrl = function() {
  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
  this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
  return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
  if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "'");
  return "type_error:TrustedResourceUrl";
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.TrustedResourceUrl;
  b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
  return b;
};
goog.html.SafeHtml = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
  this.dir_ = null;
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
  return this.dir_;
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
  return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeHtml.unwrap = function(a) {
  if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeHtml, got '" + a + "'");
  return "type_error:SafeHtml";
};
goog.html.SafeHtml.htmlEscape = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  var b = null;
  a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b);
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = goog.object.createSet("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet("embed", "iframe", "link", "object", "script", "style", "template");
goog.html.SafeHtml.create = function(a, b, c) {
  if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) {
    throw Error("Invalid tag name <" + a + ">.");
  }
  if (a.toLowerCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) {
    throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
  }
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(a, b, c);
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
  var e = {};
  e.src = a || null;
  e.srcdoc = b || null;
  a = goog.html.SafeHtml.combineAttributes(e, {sandbox:""}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
  if (c instanceof goog.string.Const) {
    c = goog.string.Const.unwrap(c);
  } else {
    if ("style" == b.toLowerCase()) {
      c = goog.html.SafeHtml.getStyleValue_(c);
    } else {
      if (/^on/i.test(b)) {
        throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
      }
      if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_) {
        if (c instanceof goog.html.TrustedResourceUrl) {
          c = goog.html.TrustedResourceUrl.unwrap(c);
        } else {
          if (c instanceof goog.html.SafeUrl) {
            c = goog.html.SafeUrl.unwrap(c);
          } else {
            throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl or goog.string.Const value, "' + c + '" given.');
          }
        }
      }
    }
  }
  c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
  goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
  return b + '="' + goog.string.htmlEscape(String(c)) + '"';
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
  if (!goog.isObject(a)) {
    throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
  }
  a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
  return goog.html.SafeStyle.unwrap(a);
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
  b = goog.html.SafeHtml.create(b, c, d);
  b.dir_ = a;
  return b;
};
goog.html.SafeHtml.concat = function(a) {
  var b = goog.i18n.bidi.Dir.NEUTRAL, c = "", d = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null));
  };
  goog.array.forEach(arguments, d);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b);
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
  var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
  c.dir_ = a;
  return c;
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
  var c = new goog.html.SafeHtml;
  c.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  c.dir_ = b;
  return c;
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
  var d = null, e = "<" + a;
  if (b) {
    for (var f in b) {
      if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(f)) {
        throw Error('Invalid attribute name "' + f + '".');
      }
      var g = b[f];
      goog.isDefAndNotNull(g) && (e += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, f, g));
    }
  }
  goog.isDef(c) ? goog.isArray(c) || (c = [c]) : c = [];
  goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
  (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d);
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
  }
  for (e in b) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
  }
  for (e in c) {
    var f = e.toLowerCase();
    if (f in a) {
      throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
    }
    f in b && delete d[f];
    d[e] = c[e];
  }
  return d;
};
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.dom.safe = {};
goog.dom.safe.setInnerHtml = function(a, b) {
  a.innerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.setOuterHtml = function(a, b) {
  a.outerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.documentWrite = function(a, b) {
  a.write(goog.html.SafeHtml.unwrap(b));
};
goog.dom.safe.setAnchorHref = function(a, b) {
  var c;
  c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(c);
};
goog.dom.safe.setLocationHref = function(a, b) {
  var c;
  c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(c);
};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, 
INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE, LEGACY_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper);
};
goog.dom.getDocument = function() {
  return document;
};
goog.dom.getElement = function(a) {
  return goog.dom.getElementHelper_(document, a);
};
goog.dom.getElementHelper_ = function(a, b) {
  return goog.isString(b) ? a.getElementById(b) : b;
};
goog.dom.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(document, a);
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
  goog.asserts.assertString(b);
  var c = goog.dom.getElementHelper_(a, b);
  return c = goog.asserts.assertElement(c, "No element found with id: " + b);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c);
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b);
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document, d = null;
  return(d = goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null;
};
goog.dom.getRequiredElementByClass = function(a, b) {
  var c = goog.dom.getElementByClass(a, b);
  return goog.asserts.assert(c, "No element found with className: " + a);
};
goog.dom.canUseQuerySelector_ = function(a) {
  return!(!a.querySelectorAll || !a.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(a) && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""));
  }
  if (c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if (b) {
      d = {};
      for (var e = 0, f = 0, g;g = a[f];f++) {
        b == g.nodeName && (d[e++] = g);
      }
      d.length = e;
      return d;
    }
    return a;
  }
  a = a.getElementsByTagName(b || "*");
  if (c) {
    d = {};
    for (f = e = 0;g = a[f];f++) {
      b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
    }
    d.length = e;
    return d;
  }
  return a;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window);
};
goog.dom.getViewportSize_ = function(a) {
  a = a.document;
  a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight);
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if (b) {
    var c = b.body, d = b.documentElement;
    if (!d || !c) {
      return 0;
    }
    a = goog.dom.getViewportSize_(a).height;
    if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
    } else {
      var b = d.scrollHeight, e = d.offsetHeight;
      d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
      c = b > a ? b > e ? b : e : b < e ? b : e;
    }
  }
  return c;
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a);
  a = goog.dom.getWindow_(a);
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement;
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window;
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView;
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function(a, b) {
  var c = b[0], d = b[1];
  if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if (d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var e = {};
      goog.object.extend(e, d);
      delete e.type;
      d = e;
    }
    c.push(">");
    c = c.join("");
  }
  c = a.createElement(c);
  d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
  2 < b.length && goog.dom.append_(a, c, b, 2);
  return c;
};
goog.dom.append_ = function(a, b, c, d) {
  function e(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c);
  }
  for (;d < c.length;d++) {
    var f = c[d];
    goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return document.createElement(a);
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(String(a));
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c);
};
goog.dom.createTable_ = function(a, b, c, d) {
  for (var e = a.createElement(goog.dom.TagName.TABLE), f = e.appendChild(a.createElement(goog.dom.TagName.TBODY)), g = 0;g < b;g++) {
    for (var h = a.createElement(goog.dom.TagName.TR), m = 0;m < c;m++) {
      var u = a.createElement(goog.dom.TagName.TD);
      d && goog.dom.setTextContent(u, goog.string.Unicode.NBSP);
      h.appendChild(u);
    }
    f.appendChild(h);
  }
  return e;
};
goog.dom.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(document, a);
};
goog.dom.safeHtmlToNode_ = function(a, b) {
  var c = a.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.create("br"), b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
  return goog.dom.childrenToNode_(a, c);
};
goog.dom.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(document, a);
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
  var c = a.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
  return goog.dom.childrenToNode_(a, c);
};
goog.dom.childrenToNode_ = function(a, b) {
  if (1 == b.childNodes.length) {
    return b.removeChild(b.firstChild);
  }
  for (var c = a.createDocumentFragment();b.firstChild;) {
    c.appendChild(b.firstChild);
  }
  return c;
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode;
};
goog.dom.canHaveChildren = function(a) {
  if (a.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1;
  }
  switch(a.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.COMMAND:
    ;
    case goog.dom.TagName.EMBED:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.KEYGEN:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.SOURCE:
    ;
    case goog.dom.TagName.STYLE:
    ;
    case goog.dom.TagName.TRACK:
    ;
    case goog.dom.TagName.WBR:
      return!1;
  }
  return!0;
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b);
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1);
};
goog.dom.removeChildren = function(a) {
  for (var b;b = a.firstChild;) {
    a.removeChild(b);
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b);
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling);
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null);
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null;
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b);
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (a.removeNode) {
      return a.removeNode(!1);
    }
    for (;b = a.firstChild;) {
      c.insertBefore(b, a);
    }
    return goog.dom.removeNode(a);
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function(a) {
  return void 0 != a.firstElementChild ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0);
};
goog.dom.getLastElementChild = function(a) {
  return void 0 != a.lastElementChild ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1);
};
goog.dom.getNextElementSibling = function(a) {
  return void 0 != a.nextElementSibling ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function(a) {
  return void 0 != a.previousElementSibling ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function(a, b) {
  for (;a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling;
  }
  return a;
};
goog.dom.getNextNode = function(a) {
  if (!a) {
    return null;
  }
  if (a.firstChild) {
    return a.firstChild;
  }
  for (;a && !a.nextSibling;) {
    a = a.parentNode;
  }
  return a ? a.nextSibling : null;
};
goog.dom.getPreviousNode = function(a) {
  if (!a) {
    return null;
  }
  if (!a.previousSibling) {
    return a.parentNode;
  }
  for (a = a.previousSibling;a && a.lastChild;) {
    a = a.lastChild;
  }
  return a;
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && 0 < a.nodeType;
};
goog.dom.isElement = function(a) {
  return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a;
};
goog.dom.getParentElement = function(a) {
  var b;
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) {
    return b;
  }
  b = a.parentNode;
  return goog.dom.isElement(b) ? b : null;
};
goog.dom.contains = function(a, b) {
  if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b);
  }
  if ("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16);
  }
  for (;b && a != b;) {
    b = b.parentNode;
  }
  return b == a;
};
goog.dom.compareNodeOrder = function(a, b) {
  if (a == b) {
    return 0;
  }
  if (a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT) {
      return-1;
    }
    if (b.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if (c && d) {
      return a.sourceIndex - b.sourceIndex;
    }
    var e = a.parentNode, f = b.parentNode;
    return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex);
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(!0);
  d = d.createRange();
  d.selectNode(b);
  d.collapse(!0);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d);
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if (c == b) {
    return-1;
  }
  for (var d = b;d.parentNode != c;) {
    d = d.parentNode;
  }
  return goog.dom.compareSiblingOrder_(d, a);
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for (var c = b;c = c.previousSibling;) {
    if (c == a) {
      return-1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if (!c) {
    return null;
  }
  if (1 == c) {
    return arguments[0];
  }
  var d = [], e = Infinity;
  for (b = 0;b < c;b++) {
    for (var f = [], g = arguments[b];g;) {
      f.unshift(g), g = g.parentNode;
    }
    d.push(f);
    e = Math.min(e, f.length);
  }
  f = null;
  for (b = 0;b < e;b++) {
    for (var g = d[0][b], h = 1;h < c;h++) {
      if (g != d[h][b]) {
        return f;
      }
    }
    f = g;
  }
  return f;
};
goog.dom.getOwnerDocument = function(a) {
  goog.asserts.assert(a, "Node cannot be null or undefined.");
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document;
};
goog.dom.getFrameContentDocument = function(a) {
  return a.contentDocument || a.contentWindow.document;
};
goog.dom.getFrameContentWindow = function(a) {
  return a.contentWindow || goog.dom.getWindow(goog.dom.getFrameContentDocument(a));
};
goog.dom.setTextContent = function(a, b) {
  goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in a) {
    a.textContent = b;
  } else {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      a.data = b;
    } else {
      if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (;a.lastChild != a.firstChild;) {
          a.removeChild(a.lastChild);
        }
        a.firstChild.data = b;
      } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)));
      }
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  if ("outerHTML" in a) {
    return a.outerHTML;
  }
  var b = goog.dom.getOwnerDocument(a).createElement("div");
  b.appendChild(a.cloneNode(!0));
  return b.innerHTML;
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0;
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, !1);
  return c;
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if (null != a) {
    for (a = a.firstChild;a;) {
      if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) {
        return!0;
      }
      a = a.nextSibling;
    }
  }
  return!1;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a);
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function(a) {
  var b;
  return(b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b;
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
  a = a.getAttributeNode("tabindex");
  return goog.isDefAndNotNull(a) && a.specified;
};
goog.dom.isTabIndexFocusable_ = function(a) {
  a = a.tabIndex;
  return goog.isNumber(a) && 0 <= a && 32768 > a;
};
goog.dom.nativelySupportsFocus_ = function(a) {
  return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON;
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
  a = goog.isFunction(a.getBoundingClientRect) ? a.getBoundingClientRect() : {height:a.offsetHeight, width:a.offsetWidth};
  return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width;
};
goog.dom.getTextContent = function(a) {
  if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText);
  } else {
    var b = [];
    goog.dom.getTextContent_(a, b, !0);
    a = b.join("");
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a;
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, !1);
  return b.join("");
};
goog.dom.getTextContent_ = function(a, b, c) {
  if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
    } else {
      if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
      } else {
        for (a = a.firstChild;a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling;
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length;
};
goog.dom.getNodeTextOffset = function(a, b) {
  for (var c = b || goog.dom.getOwnerDocument(a).body, d = [];a && a != c;) {
    for (var e = a;e = e.previousSibling;) {
      d.unshift(goog.dom.getTextContent(e));
    }
    a = a.parentNode;
  }
  return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  a = [a];
  for (var d = 0, e = null;0 < a.length && d < b;) {
    if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (e.nodeType == goog.dom.NodeType.TEXT) {
        var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), d = d + f.length
      } else {
        if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
        } else {
          for (f = e.childNodes.length - 1;0 <= f;f--) {
            a.push(e.childNodes[f]);
          }
        }
      }
    }
  }
  goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
  return e;
};
goog.dom.isNodeList = function(a) {
  if (a && "number" == typeof a.length) {
    if (goog.isObject(a)) {
      return "function" == typeof a.item || "string" == typeof a.item;
    }
    if (goog.isFunction(a)) {
      return "function" == typeof a.item;
    }
  }
  return!1;
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
  if (!b && !c) {
    return null;
  }
  var e = b ? b.toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return(!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c));
  }, !0, d);
};
goog.dom.getAncestorByClass = function(a, b, c) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b, c);
};
goog.dom.getAncestor = function(a, b, c, d) {
  c || (a = a.parentNode);
  c = null == d;
  for (var e = 0;a && (c || e <= d);) {
    if (b(a)) {
      return a;
    }
    a = a.parentNode;
    e++;
  }
  return null;
};
goog.dom.getActiveElement = function(a) {
  try {
    return a && a.activeElement;
  } catch (b) {
  }
  return null;
};
goog.dom.getPixelRatio = function() {
  var a = goog.dom.getWindow(), b = goog.userAgent.GECKO && goog.userAgent.MOBILE;
  return goog.isDef(a.devicePixelRatio) && !b ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(.75) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(3) || 1 : 1;
};
goog.dom.matchesPixelRatio_ = function(a) {
  return goog.dom.getWindow().matchMedia("(-webkit-min-device-pixel-ratio: " + a + "),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + a + "dppx)").matches ? a : 0;
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a;
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.dom.getElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c);
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
  return goog.dom.getRequiredElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return this.document_.createElement(a);
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(String(a));
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c);
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(this.document_, a);
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(this.document_, a);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
  return goog.dom.getActiveElement(a || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.style = {};
goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS = !1;
goog.style.setStyle = function(a, b, c) {
  if (goog.isString(b)) {
    goog.style.setStyle_(a, c, b);
  } else {
    for (var d in b) {
      goog.style.setStyle_(a, b[d], d);
    }
  }
};
goog.style.setStyle_ = function(a, b, c) {
  (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b);
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
  var c = goog.style.styleNameCache_[b];
  if (!c) {
    var d = goog.string.toCamelCase(b), c = d;
    void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
    goog.style.styleNameCache_[b] = c;
  }
  return c;
};
goog.style.getVendorStyleName_ = function(a, b) {
  var c = goog.string.toCamelCase(b);
  return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b;
};
goog.style.getStyle = function(a, b) {
  var c = a.style[goog.string.toCamelCase(b)];
  return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || "";
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : "";
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null;
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b];
};
goog.style.getComputedBoxSizing = function(a) {
  return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position");
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor");
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX");
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY");
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex");
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign");
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor");
};
goog.style.getComputedTransform = function(a) {
  var b = goog.style.getVendorStyleName_(a, "transform");
  return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform");
};
goog.style.setPosition = function(a, b, c) {
  var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersionOrHigher("1.9");
  b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = goog.style.getPixelStyleValue_(d, e);
  a.style.top = goog.style.getPixelStyleValue_(b, e);
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop);
};
goog.style.getClientViewportElement = function(a) {
  a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body;
};
goog.style.getViewportPageOffset = function(a) {
  var b = a.body;
  a = a.documentElement;
  return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop);
};
goog.style.getBoundingClientRect_ = function(a) {
  var b;
  try {
    b = a.getBoundingClientRect();
  } catch (c) {
    return{left:0, top:0, right:0, bottom:0};
  }
  goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b;
};
goog.style.getOffsetParent = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    return a.offsetParent;
  }
  var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = "fixed" == c || "absolute" == c;
  for (a = a.parentNode;a && a != b;a = a.parentNode) {
    if (c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function(a) {
  for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement();a = goog.style.getOffsetParent(a);) {
    if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
      var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
      g.x += h.x;
      g.y += h.y;
      b.top = Math.max(b.top, g.y);
      b.right = Math.min(b.right, g.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
      b.left = Math.max(b.left, g.x);
    }
  }
  d = f.scrollLeft;
  f = f.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, f);
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null;
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
  var d = goog.style.getPageOffset(a), e = goog.style.getPageOffset(b), f = goog.style.getBorderBox(b), g = d.x - e.x - f.left, d = d.y - e.y - f.top, e = b.clientWidth - a.offsetWidth;
  a = b.clientHeight - a.offsetHeight;
  f = b.scrollLeft;
  b = b.scrollTop;
  c ? (f += g - e / 2, b += d - a / 2) : (f += Math.min(g, Math.max(g - e, 0)), b += Math.min(d, Math.max(d - a, 0)));
  return new goog.math.Coordinate(f, b);
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  a = goog.style.getContainerOffsetToScrollInto(a, b, c);
  b.scrollLeft = a.x;
  b.scrollTop = a.y;
};
goog.style.getClientLeftTop = function(a) {
  if (goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("1.9")) {
    var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
    if (goog.style.isRightToLeft(a)) {
      var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth")), b = b + c
    }
    return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")));
  }
  return new goog.math.Coordinate(a.clientLeft, a.clientTop);
};
goog.style.getPageOffset = function(a) {
  var b, c = goog.dom.getOwnerDocument(a), d = goog.style.getStyle_(a, "position");
  goog.asserts.assertObject(a, "Parameter is required");
  var e = !goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS && goog.userAgent.GECKO && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new goog.math.Coordinate(0, 0), g = goog.style.getClientViewportElement(c);
  if (a == g) {
    return f;
  }
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || a.getBoundingClientRect) {
    b = goog.style.getBoundingClientRect_(a), a = goog.dom.getDomHelper(c).getDocumentScroll(), f.x = b.left + a.x, f.y = b.top + a.y;
  } else {
    if (c.getBoxObjectFor && !e) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY;
    } else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if (goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(b)) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break;
        }
        b = b.offsetParent;
      } while (b && b != a);
      if (goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == d) {
        f.y -= c.body.offsetTop;
      }
      for (b = a;(b = goog.style.getOffsetParent(b)) && b != c.body && b != g;) {
        f.x -= b.scrollLeft, goog.userAgent.OPERA && "TR" == b.tagName || (f.y -= b.scrollTop);
      }
    }
  }
  return f;
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x;
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y;
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), e = a;
  do {
    var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
    c.x += f.x;
    c.y += f.y;
  } while (d && d != b && (e = d.frameElement) && (d = d.parent));
  return c;
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if (b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body;
    c = goog.style.getFramedPageOffset(d, c.getWindow());
    c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y;
  }
};
goog.style.getRelativePosition = function(a, b) {
  var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(c.x - d.x, c.y - d.y);
};
goog.style.getClientPositionForElement_ = function(a) {
  var b;
  if (goog.style.GET_BOUNDING_CLIENT_RECT_ALWAYS_EXISTS || a.getBoundingClientRect) {
    b = goog.style.getBoundingClientRect_(a), b = new goog.math.Coordinate(b.left, b.top);
  } else {
    b = goog.dom.getDomHelper(a).getDocumentScroll();
    var c = goog.style.getPageOffset(a);
    b = new goog.math.Coordinate(c.x - b.x, c.y - b.y);
  }
  return goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher(12) ? goog.math.Coordinate.sum(b, goog.style.getCssTranslation(a)) : b;
};
goog.style.getClientPosition = function(a) {
  goog.asserts.assert(a);
  if (a.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(a);
  }
  var b = goog.isFunction(a.getBrowserEvent), c = a;
  a.targetTouches && a.targetTouches.length ? c = a.targetTouches[0] : b && a.getBrowserEvent().targetTouches && a.getBrowserEvent().targetTouches.length && (c = a.getBrowserEvent().targetTouches[0]);
  return new goog.math.Coordinate(c.clientX, c.clientY);
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
  goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y));
};
goog.style.setSize = function(a, b, c) {
  if (b instanceof goog.math.Size) {
    c = b.height, b = b.width;
  } else {
    if (void 0 == c) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c);
};
goog.style.getPixelStyleValue_ = function(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a;
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.getSize = function(a) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a);
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
  if ("none" != goog.style.getStyle_(b, "display")) {
    return a(b);
  }
  var c = b.style, d = c.display, e = c.visibility, f = c.position;
  c.visibility = "hidden";
  c.position = "absolute";
  c.display = "inline";
  var g = a(b);
  c.display = d;
  c.position = f;
  c.visibility = e;
  return g;
};
goog.style.getSizeWithDisplay_ = function(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = goog.userAgent.WEBKIT && !b && !c;
  return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top));
};
goog.style.getTransformedSize = function(a) {
  if (!a.getBoundingClientRect) {
    return null;
  }
  a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
  return new goog.math.Size(a.right - a.left, a.bottom - a.top);
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a);
  a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height);
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase(String(a));
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a);
};
goog.style.getOpacity = function(a) {
  var b = a.style;
  a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
  return "" == a ? a : Number(a);
};
goog.style.setOpacity = function(a, b) {
  var c = a.style;
  "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")");
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  var c = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat");
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none";
};
goog.style.showElement = function(a, b) {
  goog.style.setElementShown(a, b);
};
goog.style.setElementShown = function(a, b) {
  a.style.display = b ? "" : "none";
};
goog.style.isElementShown = function(a) {
  return "none" != a.style.display;
};
goog.style.installStyles = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = null, e = c.getDocument();
  goog.userAgent.IE && e.createStyleSheet ? (d = e.createStyleSheet(), goog.style.setStyles(d, a)) : (e = c.getElementsByTagNameAndClass("head")[0], e || (d = c.getElementsByTagNameAndClass("body")[0], e = c.createDom("head"), d.parentNode.insertBefore(e, d)), d = c.createDom("style"), goog.style.setStyles(d, a), c.appendChild(e, d));
  return d;
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a);
};
goog.style.setStyles = function(a, b) {
  goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = b : a.innerHTML = b;
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap";
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = goog.userAgent.GECKO ? goog.userAgent.isVersionOrHigher("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block";
};
goog.style.isRightToLeft = function(a) {
  return "rtl" == goog.style.getStyle_(a, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1;
};
goog.style.setUnselectable = function(a, b, c) {
  c = c ? null : a.getElementsByTagName("*");
  var d = goog.style.unselectableStyle_;
  if (d) {
    if (b = b ? "none" : "", a.style[d] = b, c) {
      a = 0;
      for (var e;e = c[a];a++) {
        e.style[d] = b;
      }
    }
  } else {
    if (goog.userAgent.IE || goog.userAgent.OPERA) {
      if (b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for (a = 0;e = c[a];a++) {
          e.setAttribute("unselectable", b);
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight);
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(a, b, "border-box");
  } else {
    if (c = a.style, d) {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
      c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom;
    } else {
      c.pixelWidth = b.width, c.pixelHeight = b.height;
    }
  }
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
  }
  c = goog.style.getBorderBoxSize(a);
  b = goog.style.getPaddingBox(a);
  a = goog.style.getBorderBox(a);
  return new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom);
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) {
    goog.style.setBoxSizingSize_(a, b, "content-box");
  } else {
    if (c = a.style, d) {
      c.pixelWidth = b.width, c.pixelHeight = b.height;
    } else {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
      c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom;
    }
  }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = Math.max(b.width, 0) + "px";
  a.height = Math.max(b.height, 0) + "px";
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if (/^\d+px?$/.test(b)) {
    return parseInt(b, 10);
  }
  var e = a.style[c], f = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = e;
  a.runtimeStyle[c] = f;
  return b;
};
goog.style.getIePixelDistance_ = function(a, b) {
  var c = goog.style.getCascadedStyle(a, b);
  return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function(a, b) {
  if (goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(e, d, f, c);
  }
  c = goog.style.getComputedStyle(a, b + "Left");
  d = goog.style.getComputedStyle(a, b + "Right");
  e = goog.style.getComputedStyle(a, b + "Top");
  f = goog.style.getComputedStyle(a, b + "Bottom");
  return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c));
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding");
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin");
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if ("none" == goog.style.getCascadedStyle(a, b + "Style")) {
    return 0;
  }
  var c = goog.style.getCascadedStyle(a, b + "Width");
  return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft");
};
goog.style.getBorderBox = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop");
    a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b);
  }
  b = goog.style.getComputedStyle(a, "borderLeftWidth");
  c = goog.style.getComputedStyle(a, "borderRightWidth");
  d = goog.style.getComputedStyle(a, "borderTopWidth");
  a = goog.style.getComputedStyle(a, "borderBottomWidth");
  return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if (b.body.createTextRange && goog.dom.contains(b, a)) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName");
    } catch (d) {
      c = "";
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  1 < a.length && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return(a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if (b && "px" == c) {
    return parseInt(b, 10);
  }
  if (goog.userAgent.IE) {
    if (c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
    }
    if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft");
    }
  }
  c = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b;
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    a = a.split(/\s*:\s*/);
    2 == a.length && (b[goog.string.toCamelCase(a[0].toLowerCase())] = a[1]);
  });
  return b;
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";");
  });
  return b.join("");
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b;
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function(a) {
  var b = goog.dom.createElement("div");
  a && (b.className = a);
  b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  a = goog.dom.createElement("div");
  goog.style.setSize(a, "200px", "200px");
  b.appendChild(a);
  goog.dom.appendChild(goog.dom.getDocument().body, b);
  a = b.offsetWidth - b.clientWidth;
  goog.dom.removeNode(b);
  return a;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
  a = goog.style.getComputedTransform(a);
  return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0);
};
var kiwi = {};
function Storage() {
  this.cache_ = {};
}
Storage.prototype.load = function(a) {
  var b = decodeURIComponent(window.location.hash.slice(window.location.hash.indexOf("=") + 1));
  b && (this.cache_ = JSON.parse(b));
  a();
};
Storage.prototype.get = function(a, b) {
  this.cache_[a] ? b(200, this.cache_[a]) : b(404);
};
Storage.prototype.commit_ = function() {
  window.location.hash = "highlights=" + encodeURIComponent(JSON.stringify(this.cache_));
};
Storage.prototype.post = function(a, b, c) {
  this.cache_[a] = b;
  this.commit_();
  (c || function() {
  })(200, b);
};
var storage = new Storage, highlighter;
window.onload = function() {
  rangy.init();
  highlighter = rangy.createHighlighter();
  highlighter.threads = highlighter.threads || {};
  highlighter.addClassApplier(rangy.createCssClassApplier("highlight", {ignoreWhiteSpace:!0, tagNames:["span", "a"], elementAttributes:{foo:"bar"}, onElementCreate:function(a) {
    setTimeout(function() {
      var c = highlighter.getHighlightForElement(a);
      document.body.querySelector(".thread[data-thread-id = '" + c.id + "']") || storage.get("/threads/" + c.id, function(d, e) {
        var f = "", g = c.id;
        404 == d && (e = {date:(new Date).toString(), author:{username:"Sam Goto"}}, f += "thread-new");
        goog.style.getPageOffsetTop(a);
        var h = createThread(g, e), m = goog.dom.createElement("div");
        m.className = "thread";
        m.innerHTML = h;
        m.setAttribute("data-thread-id", g);
        m.className = m.className + " " + f;
        document.body.querySelector(".kiwi").appendChild(m);
      });
    }, 0);
  }, elementProperties:{href:"#", onclick:function(a) {
    a = highlighter.getHighlightForElement(this);
    var c = document.body.querySelector(".thread[data-thread-id = '" + a.id + "']");
    a = goog.style.getPageOffsetTop(this);
    var c = goog.style.getClientPosition(c).y, d = document.body.querySelector(".kiwi"), e = Number(d.style.marginTop.replace(/[^-\d\.]/g, "") || 0);
    d.style.marginTop = e + a - c + "px";
    return!1;
  }}}));
  var a = goog.dom.createElement("div");
  a.className = "kiwi";
  document.body.appendChild(a);
  storage.load(function(a) {
    storage.get("/highlights", function(a, b) {
      200 == a && highlighter.deserialize(b);
    });
  });
};
function onCreateThread(a) {
  var b = a.caption.value, c = walkUp(a, "thread");
  a = c.getAttribute("data-thread-id");
  storeThread(a, {caption:b, date:(new Date).toString(), author:{username:"Sam Goto"}}, function() {
    goog.dom.classes.remove(c, "thread-new");
    c.querySelector(".caption .content").innerHTML = b;
  });
  return!1;
}
function storeThread(a, b, c) {
  storage.post("/threads/" + a, b, function() {
    var a = highlighter.serialize();
    storage.post("/highlights", a, function() {
      c();
    });
  });
}
function walkUp(a, b) {
  for (var c = a.parentNode;null !== c;) {
    if (goog.dom.classes.has(c, b)) {
      return c;
    }
    c = c.parentNode;
  }
}
function onCancelThread(a) {
  a = walkUp(a, "thread");
  var b = a.getAttribute("data-thread-id"), c;
  for (c in highlighter.highlights) {
    highlighter.highlights[c].id == b && highlighter.removeHighlights([highlighter.highlights[c]]);
  }
  goog.dom.removeNode(a);
  return!1;
}
function onCreateComment(a) {
  var b = a.comment.value, c = walkUp(a, "thread"), d = c.getAttribute("data-thread-id");
  storage.get("/threads/" + d, function(e, f) {
    f.comments = f.comments || [];
    var g = {date:(new Date).toString(), caption:b, author:{username:"Sam Goto"}};
    f.comments.push(g);
    storage.post("/threads/" + d, f, function(b) {
      b = c.querySelector(".comments");
      var d = goog.dom.createElement("div");
      d.className = "comment";
      d.innerHTML = createComment(g);
      b.appendChild(d);
      a.comment.value = "";
    });
  });
  return!1;
}
function onCancelComment(a) {
  a.form.comment.value = "";
  return!1;
}
function createComment(a) {
  var b;
  b = "<div class='header'>  <span class='username'>";
  b += a.author.username;
  b += " </span>";
  b += "  <span class='date'>";
  b += a.date;
  b += "  </span>";
  b += "</div>";
  b += "<div class='content'>";
  b += a.caption;
  return b += "</div>";
}
function createThread(a, b) {
  var c;
  c = "  <div class='caption'>    <div class='header'>";
  c += "      <span class='username'>";
  c += b.author.username;
  c += "      </span>";
  c += "      <span class='date'>";
  c += b.date;
  c += "      </span>";
  c += "    </div>";
  c += "    <div class='content'>";
  b.caption && (c += b.caption);
  c += "    </div>";
  c += "  </div>";
  c += "  <div class='comments'>";
  for (var d in b.comments) {
    var e = b.comments[d];
    c += "<div class='comment'>";
    c += createComment(e);
    c += "</div>";
  }
  c += "  </div>";
  c += "  <div class='create-form'>";
  c += "    <form name='create-form' onsubmit='return onCreateThread(this);'>";
  c += "      <textarea required name='caption' autofocus placeholder='Add a comment'>";
  c += "</textarea>";
  c += "      <input type='submit' value='create'>";
  c += "      <input type='submit' value='cancel' onclick='return onCancelThread(this);'>";
  c += "    </form>";
  c += "  </div>";
  c += "  <div class='comment-form'>";
  c += "    <form name='comment-form' onsubmit='return onCreateComment(this);'>";
  c += "      <textarea required name='comment' placeholder='Reply'>";
  c += "</textarea>";
  c += "      <input type='submit' value='create'>";
  c += "      <input type='submit' value='cancel' onclick='return onCancelComment(this);'>";
  c += "    </form>";
  return c += "  </div>";
}
window.onmouseup = function(a) {
  "Caret" != window.getSelection().type && highlighter.highlightSelection("highlight", {exclusive:!1});
};
(function(a, b) {
  "function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a() : b.rangy = a();
})(function() {
  function a(a, b) {
    var c = typeof a[b];
    return "function" == c || !("object" != c || !a[b]) || "unknown" == c;
  }
  function b(a, b) {
    return!("object" != typeof a[b] || !a[b]);
  }
  function c(a, b) {
    return "undefined" != typeof a[b];
  }
  function d(a) {
    return function(b, c) {
      for (var d = c.length;d--;) {
        if (!a(b, c[d])) {
          return!1;
        }
      }
      return!0;
    };
  }
  function e(a) {
    return a && B(a, q) && t(a, k);
  }
  function f(a) {
    return b(a, "body") ? a.body : a.getElementsByTagName("body")[0];
  }
  function g(b) {
    "undefined" != typeof console && a(console, "log") && console.log(b);
  }
  function h(a) {
    p.initialized = !0;
    p.supported = !1;
    a = "Rangy is not supported in this environment. Reason: " + a;
    J && p.config.alertOnFail ? alert(a) : g(a);
  }
  function m() {
    if (J && !p.initialized) {
      var b, c = !1, d = !1;
      a(document, "createRange") && (b = document.createRange(), B(b, z) && t(b, C) && (c = !0));
      if ((b = f(document)) && "body" == b.nodeName.toLowerCase()) {
        if (b && a(b, "createTextRange") && (b = b.createTextRange(), e(b) && (d = !0)), c || d) {
          p.initialized = !0;
          p.features = {implementsDomRange:c, implementsTextRange:d};
          var l, k;
          for (k in H) {
            (l = H[k]) instanceof E && l.init(l, p);
          }
          d = 0;
          for (l = K.length;d < l;++d) {
            try {
              K[d](p);
            } catch (q) {
              c = "Rangy init listener threw an exception. Continuing. Detail: " + (q.message || q.description || String(q)), g(c);
            }
          }
        } else {
          h("Neither Range nor TextRange are available");
        }
      } else {
        h("No body element found");
      }
    }
  }
  function u(a) {
    a = a || window;
    m();
    for (var b = 0, c = w.length;b < c;++b) {
      w[b](a);
    }
  }
  function E(a, b, c) {
    this.name = a;
    this.dependencies = b;
    this.supported = this.initialized = !1;
    this.initializer = c;
  }
  function A(a, b, c) {
    b = new E(a, b, function(b) {
      if (!b.initialized) {
        b.initialized = !0;
        try {
          c(p, b), b.supported = !0;
        } catch (d) {
          g("Module '" + a + "' failed to load: " + (d.message || d.description || String(d))), d.stack && g(d.stack);
        }
      }
    });
    return H[a] = b;
  }
  function y() {
  }
  var C = "startContainer startOffset endContainer endOffset collapsed commonAncestorContainer".split(" "), z = "setStart setStartBefore setStartAfter setEnd setEndBefore setEndAfter collapse selectNode selectNodeContents compareBoundaryPoints deleteContents extractContents cloneContents insertNode surroundContents cloneRange toString detach".split(" "), k = "boundingHeight boundingLeft boundingTop boundingWidth htmlText text".split(" "), q = "collapse compareEndPoints duplicate moveToElementText parentElement select setEndPoint getBoundingClientRect".split(" "), 
  B = d(a), l = d(b), t = d(c), H = {}, J = "undefined" != typeof window && "undefined" != typeof document, N = {isHostMethod:a, isHostObject:b, isHostProperty:c, areHostMethods:B, areHostObjects:l, areHostProperties:t, isTextRange:e, getBody:f}, p = {version:"1.3.0-alpha.20140921", initialized:!1, isBrowser:J, supported:!0, util:N, features:{}, modules:H, config:{alertOnFail:!0, alertOnWarn:!1, preferTextRange:!1, autoInitialize:"undefined" == typeof rangyAutoInitialize ? !0 : rangyAutoInitialize}};
  p.fail = h;
  p.warn = function(a) {
    a = "Rangy warning: " + a;
    J && p.config.alertOnWarn ? alert(a) : g(a);
  };
  var I;
  ({}).hasOwnProperty ? (N.extend = I = function(a, b, c) {
    var d, e, f;
    for (f in b) {
      b.hasOwnProperty(f) && (d = a[f], e = b[f], c && null !== d && "object" == typeof d && null !== e && "object" == typeof e && I(d, e, !0), a[f] = e);
    }
    b.hasOwnProperty("toString") && (a.toString = b.toString);
    return a;
  }, N.createOptions = function(a, b) {
    var c = {};
    I(c, b);
    a && I(c, a);
    return c;
  }) : h("hasOwnProperty not supported");
  J || h("Rangy can only run in a browser");
  (function() {
    var a;
    if (J) {
      var b = document.createElement("div");
      b.appendChild(document.createElement("span"));
      var c = [].slice;
      try {
        1 == c.call(b.childNodes, 0)[0].nodeType && (a = function(a) {
          return c.call(a, 0);
        });
      } catch (d) {
      }
    }
    a || (a = function(a) {
      for (var b = [], c = 0, d = a.length;c < d;++c) {
        b[c] = a[c];
      }
      return b;
    });
    N.toArray = a;
  })();
  var O;
  J && (a(document, "addEventListener") ? O = function(a, b, c) {
    a.addEventListener(b, c, !1);
  } : a(document, "attachEvent") ? O = function(a, b, c) {
    a.attachEvent("on" + b, c);
  } : h("Document does not have required addEventListener or attachEvent method"), N.addListener = O);
  var K = [];
  p.init = m;
  p.addInitListener = function(a) {
    p.initialized ? a(p) : K.push(a);
  };
  var w = [];
  p.addShimListener = function(a) {
    w.push(a);
  };
  J && (p.shim = p.createMissingNativeApi = u);
  E.prototype = {init:function() {
    for (var a = this.dependencies || [], b = 0, c = a.length, d, e;b < c;++b) {
      e = a[b];
      d = H[e];
      if (!(d && d instanceof E)) {
        throw Error("required module '" + e + "' not found");
      }
      d.init();
      if (!d.supported) {
        throw Error("required module '" + e + "' not supported");
      }
    }
    this.initializer(this);
  }, fail:function(a) {
    this.initialized = !0;
    this.supported = !1;
    throw Error("Module '" + this.name + "' failed to load: " + a);
  }, warn:function(a) {
    p.warn("Module " + this.name + ": " + a);
  }, deprecationNotice:function(a, b) {
    p.warn("DEPRECATED: " + a + " in module " + this.name + "is deprecated. Please use " + b + " instead");
  }, createError:function(a) {
    return Error("Error in Rangy " + this.name + " module: " + a);
  }};
  p.createModule = function(a) {
    var b, c;
    2 == arguments.length ? (b = arguments[1], c = []) : (b = arguments[2], c = arguments[1]);
    b = A(a, c, b);
    p.initialized && p.supported && b.init();
  };
  p.createCoreModule = function(a, b, c) {
    A(a, b, c);
  };
  p.RangePrototype = y;
  p.rangePrototype = new y;
  p.selectionPrototype = new function() {
  };
  p.createCoreModule("DomUtil", [], function(a, b) {
    function c(a) {
      for (var b = 0;a = a.previousSibling;) {
        ++b;
      }
      return b;
    }
    function d(a, b) {
      var c = [], e;
      for (e = a;e;e = e.parentNode) {
        c.push(e);
      }
      for (e = b;e;e = e.parentNode) {
        if (h(c, e)) {
          return e;
        }
      }
      return null;
    }
    function e(a, b, c) {
      for (b = c ? b : b.parentNode;b;) {
        if (b === a) {
          return!0;
        }
        b = b.parentNode;
      }
      return!1;
    }
    function f(a, b, c) {
      for (c = c ? a : a.parentNode;c;) {
        a = c.parentNode;
        if (a === b) {
          return c;
        }
        c = a;
      }
      return null;
    }
    function l(a) {
      a = a.nodeType;
      return 3 == a || 4 == a || 8 == a;
    }
    function g(a, b) {
      var c = b.nextSibling, d = b.parentNode;
      c ? d.insertBefore(a, c) : d.appendChild(a);
      return a;
    }
    function t(a) {
      if (9 == a.nodeType) {
        return a;
      }
      if ("undefined" != typeof a.ownerDocument) {
        return a.ownerDocument;
      }
      if ("undefined" != typeof a.document) {
        return a.document;
      }
      if (a.parentNode) {
        return t(a.parentNode);
      }
      throw b.createError("getDocument: no document found for node");
    }
    function k(a) {
      a = t(a);
      if ("undefined" != typeof a.defaultView) {
        return a.defaultView;
      }
      if ("undefined" != typeof a.parentWindow) {
        return a.parentWindow;
      }
      throw b.createError("Cannot get a window object for node");
    }
    function q(a) {
      if ("undefined" != typeof a.contentDocument) {
        return a.contentDocument;
      }
      if ("undefined" != typeof a.contentWindow) {
        return a.contentWindow.document;
      }
      throw b.createError("getIframeDocument: No Document object found for iframe element");
    }
    function r(a) {
      return a && L.isHostMethod(a, "setTimeout") && L.isHostObject(a, "document");
    }
    function x(a) {
      return a ? l(a) ? '"' + a.data + '"' : 1 == a.nodeType ? "<" + a.nodeName + (a.id ? ' id="' + a.id + '"' : "") + ">[index:" + c(a) + ",length:" + a.childNodes.length + "][" + (a.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]" : a.nodeName : "[No node]";
    }
    function F(a) {
      this._next = this.root = a;
    }
    function M(a, b) {
      this.node = a;
      this.offset = b;
    }
    function ba(a) {
      this.code = this[a];
      this.codeName = a;
      this.message = "DOMException: " + this.codeName;
    }
    var L = a.util;
    L.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || b.fail("document missing a Node creation method");
    L.isHostMethod(document, "getElementsByTagName") || b.fail("document missing getElementsByTagName method");
    var R = document.createElement("div");
    L.areHostMethods(R, ["insertBefore", "appendChild", "cloneNode"]) || b.fail("Incomplete Element implementation");
    L.isHostProperty(R, "innerHTML") || b.fail("Element is missing innerHTML property");
    R = document.createTextNode("test");
    L.areHostMethods(R, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"]) || b.fail("Incomplete Text Node implementation");
    var h = function(a, b) {
      for (var c = a.length;c--;) {
        if (a[c] === b) {
          return!0;
        }
      }
      return!1;
    }, H = !1;
    (function() {
      var b = document.createElement("b");
      b.innerHTML = "1";
      b.innerHTML = "<br>";
      H = !1;
      a.features.crashyTextNodes = H;
    })();
    var B;
    "undefined" != typeof window.getComputedStyle ? B = function(a, b) {
      return k(a).getComputedStyle(a, null)[b];
    } : "undefined" != typeof document.documentElement.currentStyle ? B = function(a, b) {
      return a.currentStyle[b];
    } : b.fail("No means of obtaining computed style properties found");
    F.prototype = {_current:null, hasNext:function() {
      return!!this._next;
    }, next:function() {
      var a = this._current = this._next, b;
      if (this._current) {
        b = a.firstChild;
        if (!b) {
          for (b = null;a !== this.root && !(b = a.nextSibling);) {
            a = a.parentNode;
          }
        }
        this._next = b;
      }
      return this._current;
    }, detach:function() {
      this._current = this._next = this.root = null;
    }};
    M.prototype = {equals:function(a) {
      return!!a && this.node === a.node && this.offset == a.offset;
    }, inspect:function() {
      return "[DomPosition(" + x(this.node) + ":" + this.offset + ")]";
    }, toString:function() {
      return this.inspect();
    }};
    ba.prototype = {INDEX_SIZE_ERR:1, HIERARCHY_REQUEST_ERR:3, WRONG_DOCUMENT_ERR:4, NO_MODIFICATION_ALLOWED_ERR:7, NOT_FOUND_ERR:8, NOT_SUPPORTED_ERR:9, INVALID_STATE_ERR:11, INVALID_NODE_TYPE_ERR:24};
    ba.prototype.toString = function() {
      return this.message;
    };
    a.dom = {arrayContains:h, isHtmlNamespace:function(a) {
      var b;
      return "undefined" == typeof a.namespaceURI || null === (b = a.namespaceURI) || "http://www.w3.org/1999/xhtml" == b;
    }, parentElement:function(a) {
      a = a.parentNode;
      return 1 == a.nodeType ? a : null;
    }, getNodeIndex:c, getNodeLength:function(a) {
      switch(a.nodeType) {
        case 7:
        ;
        case 10:
          return 0;
        case 3:
        ;
        case 8:
          return a.length;
        default:
          return a.childNodes.length;
      }
    }, getCommonAncestor:d, isAncestorOf:e, isOrIsAncestorOf:function(a, b) {
      return e(a, b, !0);
    }, getClosestAncestorIn:f, isCharacterDataNode:l, isTextOrCommentNode:function(a) {
      if (!a) {
        return!1;
      }
      a = a.nodeType;
      return 3 == a || 8 == a;
    }, insertAfter:g, splitDataNode:function(a, b, d) {
      var e = a.cloneNode(!1);
      e.deleteData(0, b);
      a.deleteData(b, a.length - b);
      g(e, a);
      if (d) {
        for (var f = 0, n;n = d[f++];) {
          n.node == a && n.offset > b ? (n.node = e, n.offset -= b) : n.node == a.parentNode && n.offset > c(a) && ++n.offset;
        }
      }
      return e;
    }, getDocument:t, getWindow:k, getIframeWindow:function(a) {
      if ("undefined" != typeof a.contentWindow) {
        return a.contentWindow;
      }
      if ("undefined" != typeof a.contentDocument) {
        return a.contentDocument.defaultView;
      }
      throw b.createError("getIframeWindow: No Window object found for iframe element");
    }, getIframeDocument:q, getBody:L.getBody, isWindow:r, getContentDocument:function(a, b, c) {
      var d;
      a ? L.isHostProperty(a, "nodeType") ? d = 1 == a.nodeType && "iframe" == a.tagName.toLowerCase() ? q(a) : t(a) : r(a) && (d = a.document) : d = document;
      if (!d) {
        throw b.createError(c + "(): Parameter must be a Window object or DOM node");
      }
      return d;
    }, getRootContainer:function(a) {
      for (var b;b = a.parentNode;) {
        a = b;
      }
      return a;
    }, comparePoints:function(a, e, r, L) {
      var l;
      if (a == r) {
        return e === L ? 0 : e < L ? -1 : 1;
      }
      if (l = f(r, a, !0)) {
        return e <= c(l) ? -1 : 1;
      }
      if (l = f(a, r, !0)) {
        return c(l) < L ? -1 : 1;
      }
      e = d(a, r);
      if (!e) {
        throw Error("comparePoints error: nodes have no common ancestor");
      }
      a = a === e ? e : f(a, e, !0);
      r = r === e ? e : f(r, e, !0);
      if (a === r) {
        throw b.createError("comparePoints got to case 4 and childA and childB are the same!");
      }
      for (e = e.firstChild;e;) {
        if (e === a) {
          return-1;
        }
        if (e === r) {
          return 1;
        }
        e = e.nextSibling;
      }
    }, isBrokenNode:function(a) {
      return!1;
    }, inspectNode:x, getComputedStyleProperty:B, fragmentFromNodeChildren:function(a) {
      for (var b = t(a).createDocumentFragment(), c;c = a.firstChild;) {
        b.appendChild(c);
      }
      return b;
    }, createIterator:function(a) {
      return new F(a);
    }, DomPosition:M};
    a.DOMException = ba;
  });
  p.createCoreModule("DomRange", ["DomUtil"], function(a, b) {
    function c(a, b) {
      return 3 != a.nodeType && (O(a, b.startContainer) || O(a, b.endContainer));
    }
    function d(a) {
      return a.document || K(a.startContainer);
    }
    function e(a) {
      return new N(a.parentNode, I(a));
    }
    function f(a) {
      return new N(a.parentNode, I(a) + 1);
    }
    function l(a, b, c) {
      var d = 11 == a.nodeType ? a.firstChild : a;
      v(b) ? c == b.length ? D.insertAfter(a, b) : b.parentNode.insertBefore(a, 0 == c ? b : A(b, c)) : c >= b.childNodes.length ? b.appendChild(a) : b.insertBefore(a, b.childNodes[c]);
      return d;
    }
    function g(a, b, c) {
      y(a);
      y(b);
      if (d(b) != d(a)) {
        throw new w("WRONG_DOCUMENT_ERR");
      }
      var e = u(a.startContainer, a.startOffset, b.endContainer, b.endOffset);
      a = u(a.endContainer, a.endOffset, b.startContainer, b.startOffset);
      return c ? 0 >= e && 0 <= a : 0 > e && 0 < a;
    }
    function t(a) {
      for (var b, c, e = d(a.range).createDocumentFragment();c = a.next();) {
        b = a.isPartiallySelectedSubtree();
        c = c.cloneNode(!b);
        b && (b = a.getSubtreeIterator(), c.appendChild(t(b)), b.detach());
        if (10 == c.nodeType) {
          throw new w("HIERARCHY_REQUEST_ERR");
        }
        e.appendChild(c);
      }
      return e;
    }
    function k(a, b, c) {
      var d, e;
      for (c = c || {stop:!1};d = a.next();) {
        if (a.isPartiallySelectedSubtree()) {
          if (!1 === b(d)) {
            c.stop = !0;
            break;
          } else {
            if (d = a.getSubtreeIterator(), k(d, b, c), d.detach(), c.stop) {
              break;
            }
          }
        } else {
          for (d = D.createIterator(d);e = d.next();) {
            if (!1 === b(e)) {
              c.stop = !0;
              return;
            }
          }
        }
      }
    }
    function q(a) {
      for (var b;a.next();) {
        a.isPartiallySelectedSubtree() ? (b = a.getSubtreeIterator(), q(b), b.detach()) : a.remove();
      }
    }
    function r(a) {
      for (var b, c = d(a.range).createDocumentFragment(), e;b = a.next();) {
        a.isPartiallySelectedSubtree() ? (b = b.cloneNode(!1), e = a.getSubtreeIterator(), b.appendChild(r(e)), e.detach()) : a.remove();
        if (10 == b.nodeType) {
          throw new w("HIERARCHY_REQUEST_ERR");
        }
        c.appendChild(b);
      }
      return c;
    }
    function x(a, b, c) {
      var d = !(!b || !b.length), e, n = !!c;
      d && (e = new RegExp("^(" + b.join("|") + ")$"));
      var G = [];
      k(new M(a, !1), function(b) {
        if (!d || e.test(b.nodeType)) {
          if (!n || c(b)) {
            var f = a.startContainer;
            b == f && v(f) && a.startOffset == f.length || (f = a.endContainer, b == f && v(f) && 0 == a.endOffset || G.push(b));
          }
        }
      });
      return G;
    }
    function F(a) {
      return "[" + ("undefined" == typeof a.getName ? "Range" : a.getName()) + "(" + D.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + D.inspectNode(a.endContainer) + ":" + a.endOffset + ")]";
    }
    function M(a, b) {
      this.range = a;
      this.clonePartiallySelectedTextNodes = b;
      if (!a.collapsed) {
        this.sc = a.startContainer;
        this.so = a.startOffset;
        this.ec = a.endContainer;
        this.eo = a.endOffset;
        var c = a.commonAncestorContainer;
        this.sc === this.ec && v(this.sc) ? (this.isSingleCharacterDataNode = !0, this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc !== c || v(this.sc) ? E(this.sc, c, !0) : this.sc.childNodes[this.so], this._last = this.ec !== c || v(this.ec) ? E(this.ec, c, !0) : this.ec.childNodes[this.eo - 1]);
      }
    }
    function ba(a) {
      return function(b, c) {
        for (var d, e = c ? b : b.parentNode;e;) {
          d = e.nodeType;
          if (fa(a, d)) {
            return e;
          }
          e = e.parentNode;
        }
        return null;
      };
    }
    function L(a, b) {
      if (Fa(a, b)) {
        throw new w("INVALID_NODE_TYPE_ERR");
      }
    }
    function R(a, b) {
      if (!fa(b, a.nodeType)) {
        throw new w("INVALID_NODE_TYPE_ERR");
      }
    }
    function h(a, b) {
      if (0 > b || b > (v(a) ? a.length : a.childNodes.length)) {
        throw new w("INDEX_SIZE_ERR");
      }
    }
    function H(a, b) {
      if (wa(a, !0) !== wa(b, !0)) {
        throw new w("WRONG_DOCUMENT_ERR");
      }
    }
    function B(a) {
      if (Ga(a, !0)) {
        throw new w("NO_MODIFICATION_ALLOWED_ERR");
      }
    }
    function p(a, b) {
      if (!a) {
        throw new w(b);
      }
    }
    function J(a) {
      return pa && D.isBrokenNode(a) || !fa(qa, a.nodeType) && !wa(a, !0);
    }
    function z(a, b) {
      return b <= (v(a) ? a.length : a.childNodes.length);
    }
    function ra(a) {
      return!!a.startContainer && !!a.endContainer && !J(a.startContainer) && !J(a.endContainer) && z(a.startContainer, a.startOffset) && z(a.endContainer, a.endOffset);
    }
    function y(a) {
      if (!ra(a)) {
        throw Error("Range error: Range is no longer valid after DOM mutation (" + a.inspect() + ")");
      }
    }
    function n(a, b) {
      y(a);
      var c = a.startContainer, d = a.startOffset, e = a.endContainer, n = a.endOffset, G = c === e;
      v(e) && 0 < n && n < e.length && A(e, n, b);
      v(c) && 0 < d && d < c.length && (c = A(c, d, b), G ? (n -= d, e = c) : e == c.parentNode && n >= I(c) && n++, d = 0);
      a.setStartAndEnd(c, d, e, n);
    }
    function P(a) {
      y(a);
      var b = a.commonAncestorContainer.parentNode.cloneNode(!1);
      b.appendChild(a.cloneContents());
      return b.innerHTML;
    }
    function T(a) {
      a.START_TO_START = 0;
      a.START_TO_END = 1;
      a.END_TO_END = 2;
      a.END_TO_START = 3;
      a.NODE_BEFORE = 0;
      a.NODE_AFTER = 1;
      a.NODE_BEFORE_AND_AFTER = 2;
      a.NODE_INSIDE = 3;
    }
    function ga(a) {
      T(a);
      T(a.prototype);
    }
    function ka(a, b) {
      return function() {
        y(this);
        var c = this.startContainer, d = this.startOffset, e = this.commonAncestorContainer, n = new M(this, !0);
        c !== e && (c = E(c, e, !0), d = f(c), c = d.node, d = d.offset);
        k(n, B);
        n.reset();
        e = a(n);
        n.detach();
        b(this, c, d, c, d);
        return e;
      };
    }
    function S(b, d) {
      function G(a, b) {
        return function(c) {
          R(c, la);
          R(X(c), qa);
          c = (a ? e : f)(c);
          (b ? T : P)(this, c.node, c.offset);
        };
      }
      function T(a, b, c) {
        var e = a.endContainer, n = a.endOffset;
        if (b !== a.startContainer || c !== a.startOffset) {
          if (X(b) != X(e) || 1 == u(b, c, e, n)) {
            e = b, n = c;
          }
          d(a, b, c, e, n);
        }
      }
      function P(a, b, c) {
        var e = a.startContainer, n = a.startOffset;
        if (b !== a.endContainer || c !== a.endOffset) {
          if (X(b) != X(e) || -1 == u(b, c, e, n)) {
            e = b, n = c;
          }
          d(a, e, n, b, c);
        }
      }
      var l = function() {
      };
      l.prototype = a.rangePrototype;
      b.prototype = new l;
      C.extend(b.prototype, {setStart:function(a, b) {
        L(a, !0);
        h(a, b);
        T(this, a, b);
      }, setEnd:function(a, b) {
        L(a, !0);
        h(a, b);
        P(this, a, b);
      }, setStartAndEnd:function() {
        var a = arguments, b = a[0], c = a[1], e = b, n = c;
        switch(a.length) {
          case 3:
            n = a[2];
            break;
          case 4:
            e = a[2], n = a[3];
        }
        d(this, b, c, e, n);
      }, setBoundary:function(a, b, c) {
        this["set" + (c ? "Start" : "End")](a, b);
      }, setStartBefore:G(!0, !0), setStartAfter:G(!1, !0), setEndBefore:G(!0, !1), setEndAfter:G(!1, !1), collapse:function(a) {
        y(this);
        a ? d(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : d(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
      }, selectNodeContents:function(a) {
        L(a, !0);
        d(this, a, 0, a, Q(a));
      }, selectNode:function(a) {
        L(a, !1);
        R(a, la);
        var b = e(a);
        a = f(a);
        d(this, b.node, b.offset, a.node, a.offset);
      }, extractContents:ka(r, d), deleteContents:ka(q, d), canSurroundContents:function() {
        y(this);
        B(this.startContainer);
        B(this.endContainer);
        var a = new M(this, !0), b = a._first && c(a._first, this) || a._last && c(a._last, this);
        a.detach();
        return!b;
      }, splitBoundaries:function() {
        n(this);
      }, splitBoundariesPreservingPositions:function(a) {
        n(this, a);
      }, normalizeBoundaries:function() {
        y(this);
        var a = this.startContainer, b = this.startOffset, c = this.endContainer, e = this.endOffset, n = function(a) {
          var b = a.nextSibling;
          b && b.nodeType == a.nodeType && (c = a, e = a.length, a.appendData(b.data), b.parentNode.removeChild(b));
        }, G = function(d) {
          var n = d.previousSibling;
          if (n && n.nodeType == d.nodeType) {
            a = d;
            var G = d.length;
            b = n.length;
            d.insertData(0, n.data);
            n.parentNode.removeChild(n);
            a == c ? (e += b, c = a) : c == d.parentNode && (n = I(d), e == n ? (c = d, e = G) : e > n && e--);
          }
        }, f = !0;
        v(c) ? c.length == e && n(c) : (0 < e && (f = c.childNodes[e - 1]) && v(f) && n(f), f = !this.collapsed);
        f ? v(a) ? 0 == b && G(a) : b < a.childNodes.length && (n = a.childNodes[b]) && v(n) && G(n) : (a = c, b = e);
        d(this, a, b, c, e);
      }, collapseToPoint:function(a, b) {
        L(a, !0);
        h(a, b);
        this.setStartAndEnd(a, b);
      }});
      ga(b);
    }
    function W(a) {
      a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset;
      a.commonAncestorContainer = a.collapsed ? a.startContainer : D.getCommonAncestor(a.startContainer, a.endContainer);
    }
    function m(a, b, c, d, e) {
      a.startContainer = b;
      a.startOffset = c;
      a.endContainer = d;
      a.endOffset = e;
      a.document = D.getDocument(b);
      W(a);
    }
    function aa(a) {
      this.startContainer = a;
      this.startOffset = 0;
      this.endContainer = a;
      this.endOffset = 0;
      this.document = a;
      W(this);
    }
    var D = a.dom, C = a.util, N = D.DomPosition, w = a.DOMException, v = D.isCharacterDataNode, I = D.getNodeIndex, O = D.isOrIsAncestorOf, K = D.getDocument, u = D.comparePoints, A = D.splitDataNode, E = D.getClosestAncestorIn, Q = D.getNodeLength, fa = D.arrayContains, X = D.getRootContainer, pa = a.features.crashyTextNodes;
    M.prototype = {_current:null, _next:null, _first:null, _last:null, isSingleCharacterDataNode:!1, reset:function() {
      this._current = null;
      this._next = this._first;
    }, hasNext:function() {
      return!!this._next;
    }, next:function() {
      var a = this._current = this._next;
      a && (this._next = a !== this._last ? a.nextSibling : null, v(a) && this.clonePartiallySelectedTextNodes && (a === this.ec && (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo), this._current === this.sc && (a = a.cloneNode(!0)).deleteData(0, this.so)));
      return a;
    }, remove:function() {
      var a = this._current, b, c;
      !v(a) || a !== this.sc && a !== this.ec ? a.parentNode && a.parentNode.removeChild(a) : (b = a === this.sc ? this.so : 0, c = a === this.ec ? this.eo : a.length, b != c && a.deleteData(b, c - b));
    }, isPartiallySelectedSubtree:function() {
      return c(this._current, this.range);
    }, getSubtreeIterator:function() {
      var a;
      if (this.isSingleCharacterDataNode) {
        a = this.range.cloneRange(), a.collapse(!1);
      } else {
        a = new aa(d(this.range));
        var b = this._current, c = b, e = 0, n = b, G = Q(b);
        O(b, this.sc) && (c = this.sc, e = this.so);
        O(b, this.ec) && (n = this.ec, G = this.eo);
        m(a, c, e, n, G);
      }
      return new M(a, this.clonePartiallySelectedTextNodes);
    }, detach:function() {
      this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
    }};
    var la = [1, 3, 4, 5, 7, 8, 10], qa = [2, 9, 11], ma = [1, 3, 4, 5, 7, 8, 10, 11], G = [1, 3, 4, 5, 7, 8], wa = ba([9, 11]), Ga = ba([5, 6, 10, 12]), Fa = ba([6, 10, 12]), Ca = document.createElement("style"), xa = !1;
    try {
      Ca.innerHTML = "<b>x</b>", xa = 3 == Ca.firstChild.nodeType;
    } catch (Ha) {
    }
    a.features.htmlParsingConforms = xa;
    var ya = "startContainer startOffset endContainer endOffset collapsed commonAncestorContainer".split(" ");
    C.extend(a.rangePrototype, {compareBoundaryPoints:function(a, b) {
      y(this);
      H(this.startContainer, b.startContainer);
      var c = 3 == a || 0 == a ? "start" : "end", d = 1 == a || 0 == a ? "start" : "end";
      return u(this[c + "Container"], this[c + "Offset"], b[d + "Container"], b[d + "Offset"]);
    }, insertNode:function(a) {
      y(this);
      R(a, ma);
      B(this.startContainer);
      if (O(a, this.startContainer)) {
        throw new w("HIERARCHY_REQUEST_ERR");
      }
      a = l(a, this.startContainer, this.startOffset);
      this.setStartBefore(a);
    }, cloneContents:function() {
      y(this);
      var a, b;
      if (this.collapsed) {
        return d(this).createDocumentFragment();
      }
      if (this.startContainer === this.endContainer && v(this.startContainer)) {
        return a = this.startContainer.cloneNode(!0), a.data = a.data.slice(this.startOffset, this.endOffset), b = d(this).createDocumentFragment(), b.appendChild(a), b;
      }
      b = new M(this, !0);
      a = t(b);
      b.detach();
      return a;
    }, canSurroundContents:function() {
      y(this);
      B(this.startContainer);
      B(this.endContainer);
      var a = new M(this, !0), b = a._first && c(a._first, this) || a._last && c(a._last, this);
      a.detach();
      return!b;
    }, surroundContents:function(a) {
      R(a, G);
      if (!this.canSurroundContents()) {
        throw new w("INVALID_STATE_ERR");
      }
      var b = this.extractContents();
      if (a.hasChildNodes()) {
        for (;a.lastChild;) {
          a.removeChild(a.lastChild);
        }
      }
      l(a, this.startContainer, this.startOffset);
      a.appendChild(b);
      this.selectNode(a);
    }, cloneRange:function() {
      y(this);
      for (var a = new aa(d(this)), b = ya.length, c;b--;) {
        c = ya[b], a[c] = this[c];
      }
      return a;
    }, toString:function() {
      y(this);
      var a = this.startContainer;
      if (a === this.endContainer && v(a)) {
        return 3 == a.nodeType || 4 == a.nodeType ? a.data.slice(this.startOffset, this.endOffset) : "";
      }
      var b = [], a = new M(this, !0);
      k(a, function(a) {
        3 != a.nodeType && 4 != a.nodeType || b.push(a.data);
      });
      a.detach();
      return b.join("");
    }, compareNode:function(a) {
      y(this);
      var b = a.parentNode, c = I(a);
      if (!b) {
        throw new w("NOT_FOUND_ERR");
      }
      a = this.comparePoint(b, c);
      b = this.comparePoint(b, c + 1);
      return 0 > a ? 0 < b ? 2 : 0 : 0 < b ? 1 : 3;
    }, comparePoint:function(a, b) {
      y(this);
      p(a, "HIERARCHY_REQUEST_ERR");
      H(a, this.startContainer);
      return 0 > u(a, b, this.startContainer, this.startOffset) ? -1 : 0 < u(a, b, this.endContainer, this.endOffset) ? 1 : 0;
    }, createContextualFragment:xa ? function(a) {
      var b = this.startContainer, c = K(b);
      if (!b) {
        throw new w("INVALID_STATE_ERR");
      }
      var d = null;
      1 == b.nodeType ? d = b : v(b) && (d = D.parentElement(b));
      d = null === d || "HTML" == d.nodeName && D.isHtmlNamespace(K(d).documentElement) && D.isHtmlNamespace(d) ? c.createElement("body") : d.cloneNode(!1);
      d.innerHTML = a;
      return D.fragmentFromNodeChildren(d);
    } : function(a) {
      var b = d(this).createElement("body");
      b.innerHTML = a;
      return D.fragmentFromNodeChildren(b);
    }, toHtml:function() {
      return P(this);
    }, intersectsNode:function(a, b) {
      y(this);
      p(a, "NOT_FOUND_ERR");
      if (K(a) !== d(this)) {
        return!1;
      }
      var c = a.parentNode, e = I(a);
      p(c, "NOT_FOUND_ERR");
      var n = u(c, e, this.endContainer, this.endOffset), c = u(c, e + 1, this.startContainer, this.startOffset);
      return b ? 0 >= n && 0 <= c : 0 > n && 0 < c;
    }, isPointInRange:function(a, b) {
      y(this);
      p(a, "HIERARCHY_REQUEST_ERR");
      H(a, this.startContainer);
      return 0 <= u(a, b, this.startContainer, this.startOffset) && 0 >= u(a, b, this.endContainer, this.endOffset);
    }, intersectsRange:function(a) {
      return g(this, a, !1);
    }, intersectsOrTouchesRange:function(a) {
      return g(this, a, !0);
    }, intersection:function(a) {
      if (this.intersectsRange(a)) {
        var b = u(this.startContainer, this.startOffset, a.startContainer, a.startOffset), c = u(this.endContainer, this.endOffset, a.endContainer, a.endOffset), d = this.cloneRange();
        -1 == b && d.setStart(a.startContainer, a.startOffset);
        1 == c && d.setEnd(a.endContainer, a.endOffset);
        return d;
      }
      return null;
    }, union:function(a) {
      if (this.intersectsOrTouchesRange(a)) {
        var b = this.cloneRange();
        -1 == u(a.startContainer, a.startOffset, this.startContainer, this.startOffset) && b.setStart(a.startContainer, a.startOffset);
        1 == u(a.endContainer, a.endOffset, this.endContainer, this.endOffset) && b.setEnd(a.endContainer, a.endOffset);
        return b;
      }
      throw new w("Ranges do not intersect");
    }, containsNode:function(a, b) {
      return b ? this.intersectsNode(a, !1) : 3 == this.compareNode(a);
    }, containsNodeContents:function(a) {
      return 0 <= this.comparePoint(a, 0) && 0 >= this.comparePoint(a, Q(a));
    }, containsRange:function(a) {
      var b = this.intersection(a);
      return null !== b && a.equals(b);
    }, containsNodeText:function(a) {
      var b = this.cloneRange();
      b.selectNode(a);
      var c = b.getNodes([3]);
      return 0 < c.length ? (b.setStart(c[0], 0), a = c.pop(), b.setEnd(a, a.length), this.containsRange(b)) : this.containsNodeContents(a);
    }, getNodes:function(a, b) {
      y(this);
      return x(this, a, b);
    }, getDocument:function() {
      return d(this);
    }, collapseBefore:function(a) {
      this.setEndBefore(a);
      this.collapse(!1);
    }, collapseAfter:function(a) {
      this.setStartAfter(a);
      this.collapse(!0);
    }, getBookmark:function(b) {
      var c = d(this), e = a.createRange(c);
      b = b || D.getBody(c);
      e.selectNodeContents(b);
      var c = this.intersection(e), n = 0, G = 0;
      c && (e.setEnd(c.startContainer, c.startOffset), n = e.toString().length, G = n + c.toString().length);
      return{start:n, end:G, containerNode:b};
    }, moveToBookmark:function(a) {
      var b = a.containerNode, c = 0;
      this.setStart(b, 0);
      this.collapse(!0);
      for (var b = [b], d, e = !1, n = !1, G, f;!n && (d = b.pop());) {
        if (3 == d.nodeType) {
          G = c + d.length, !e && a.start >= c && a.start <= G && (this.setStart(d, a.start - c), e = !0), e && a.end >= c && a.end <= G && (this.setEnd(d, a.end - c), n = !0), c = G;
        } else {
          for (f = d.childNodes, G = f.length;G--;) {
            b.push(f[G]);
          }
        }
      }
    }, getName:function() {
      return "DomRange";
    }, equals:function(a) {
      return aa.rangesEqual(this, a);
    }, isValid:function() {
      return ra(this);
    }, inspect:function() {
      return F(this);
    }, detach:function() {
    }});
    S(aa, m);
    C.extend(aa, {rangeProperties:ya, RangeIterator:M, copyComparisonConstants:ga, createPrototypeRange:S, inspect:F, toHtml:P, getRangeDocument:d, rangesEqual:function(a, b) {
      return a.startContainer === b.startContainer && a.startOffset === b.startOffset && a.endContainer === b.endContainer && a.endOffset === b.endOffset;
    }});
    a.DomRange = aa;
  });
  p.createCoreModule("WrappedRange", ["DomRange"], function(a, b) {
    var c, d, e = a.dom, f = a.util, l = e.DomPosition, g = a.DomRange, t = e.getBody, k = e.getContentDocument, q = e.isCharacterDataNode;
    a.features.implementsDomRange && function() {
      function d(a) {
        for (var b = l.length, c;b--;) {
          c = l[b], a[c] = a.nativeRange[c];
        }
        a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset;
      }
      var r, l = g.rangeProperties, x;
      c = function(a) {
        if (!a) {
          throw b.createError("WrappedRange: Range must be specified");
        }
        this.nativeRange = a;
        d(this);
      };
      g.createPrototypeRange(c, function(a, b, c, d, e) {
        var f = a.startContainer !== b || a.startOffset != c, r = a.endContainer !== d || a.endOffset != e, l = !a.equals(a.nativeRange);
        if (f || r || l) {
          a.setEnd(d, e), a.setStart(b, c);
        }
      });
      r = c.prototype;
      r.selectNode = function(a) {
        this.nativeRange.selectNode(a);
        d(this);
      };
      r.cloneContents = function() {
        return this.nativeRange.cloneContents();
      };
      r.surroundContents = function(a) {
        this.nativeRange.surroundContents(a);
        d(this);
      };
      r.collapse = function(a) {
        this.nativeRange.collapse(a);
        d(this);
      };
      r.cloneRange = function() {
        return new c(this.nativeRange.cloneRange());
      };
      r.refresh = function() {
        d(this);
      };
      r.toString = function() {
        return this.nativeRange.toString();
      };
      var F = document.createTextNode("test");
      t(document).appendChild(F);
      var q = document.createRange();
      q.setStart(F, 0);
      q.setEnd(F, 0);
      try {
        q.setStart(F, 1), r.setStart = function(a, b) {
          this.nativeRange.setStart(a, b);
          d(this);
        }, r.setEnd = function(a, b) {
          this.nativeRange.setEnd(a, b);
          d(this);
        }, x = function(a) {
          return function(b) {
            this.nativeRange[a](b);
            d(this);
          };
        };
      } catch (M) {
        r.setStart = function(a, b) {
          try {
            this.nativeRange.setStart(a, b);
          } catch (c) {
            this.nativeRange.setEnd(a, b), this.nativeRange.setStart(a, b);
          }
          d(this);
        }, r.setEnd = function(a, b) {
          try {
            this.nativeRange.setEnd(a, b);
          } catch (c) {
            this.nativeRange.setStart(a, b), this.nativeRange.setEnd(a, b);
          }
          d(this);
        }, x = function(a, b) {
          return function(c) {
            try {
              this.nativeRange[a](c);
            } catch (e) {
              this.nativeRange[b](c), this.nativeRange[a](c);
            }
            d(this);
          };
        };
      }
      r.setStartBefore = x("setStartBefore", "setEndBefore");
      r.setStartAfter = x("setStartAfter", "setEndAfter");
      r.setEndBefore = x("setEndBefore", "setStartBefore");
      r.setEndAfter = x("setEndAfter", "setStartAfter");
      r.selectNodeContents = function(a) {
        this.setStartAndEnd(a, 0, e.getNodeLength(a));
      };
      q.selectNodeContents(F);
      q.setEnd(F, 3);
      x = document.createRange();
      x.selectNodeContents(F);
      x.setEnd(F, 4);
      x.setStart(F, 2);
      -1 == q.compareBoundaryPoints(q.START_TO_END, x) && 1 == q.compareBoundaryPoints(q.END_TO_START, x) ? r.compareBoundaryPoints = function(a, b) {
        b = b.nativeRange || b;
        a == b.START_TO_END ? a = b.END_TO_START : a == b.END_TO_START && (a = b.START_TO_END);
        return this.nativeRange.compareBoundaryPoints(a, b);
      } : r.compareBoundaryPoints = function(a, b) {
        return this.nativeRange.compareBoundaryPoints(a, b.nativeRange || b);
      };
      x = document.createElement("div");
      x.innerHTML = "123";
      var h = x.firstChild, B = t(document);
      B.appendChild(x);
      q.setStart(h, 1);
      q.setEnd(h, 2);
      q.deleteContents();
      "13" == h.data && (r.deleteContents = function() {
        this.nativeRange.deleteContents();
        d(this);
      }, r.extractContents = function() {
        var a = this.nativeRange.extractContents();
        d(this);
        return a;
      });
      B.removeChild(x);
      B = null;
      f.isHostMethod(q, "createContextualFragment") && (r.createContextualFragment = function(a) {
        return this.nativeRange.createContextualFragment(a);
      });
      t(document).removeChild(F);
      r.getName = function() {
        return "WrappedRange";
      };
      a.WrappedRange = c;
      a.createNativeRange = function(a) {
        a = k(a, b, "createNativeRange");
        return a.createRange();
      };
    }();
    if (a.features.implementsTextRange) {
      var r = function(a, b, c, d, f) {
        var r = a.duplicate();
        r.collapse(c);
        var x = r.parentElement();
        e.isOrIsAncestorOf(b, x) || (x = b);
        if (!x.canHaveHTML) {
          return x = new l(x.parentNode, e.getNodeIndex(x)), {boundaryPosition:x, nodeInfo:{nodeIndex:x.offset, containerElement:x.node}};
        }
        b = e.getDocument(x).createElement("span");
        b.parentNode && b.parentNode.removeChild(b);
        var g, F = c ? "StartToStart" : "StartToEnd", t = f && f.containerElement == x ? f.nodeIndex : 0, k = x.childNodes.length, n = k;
        for (f = n;;) {
          f == k ? x.appendChild(b) : x.insertBefore(b, x.childNodes[f]);
          r.moveToElementText(b);
          g = r.compareEndPoints(F, a);
          if (0 == g || t == n) {
            break;
          } else {
            if (-1 == g) {
              if (n == t + 1) {
                break;
              } else {
                t = f;
              }
            } else {
              n = n == t + 1 ? t : f;
            }
          }
          f = Math.floor((t + n) / 2);
          x.removeChild(b);
        }
        F = b.nextSibling;
        if (-1 == g && F && q(F)) {
          r.setEndPoint(c ? "EndToStart" : "EndToEnd", a);
          if (/[\r\n]/.test(F.data)) {
            for (c = r.duplicate(), d = c.text.replace(/\r\n/g, "\r").length, d = c.moveStart("character", d);-1 == c.compareEndPoints("StartToEnd", c);) {
              d++, c.moveStart("character", 1);
            }
          } else {
            d = r.text.length;
          }
          c = new l(F, d);
        } else {
          a = (d || !c) && b.previousSibling, c = (c = (d || c) && b.nextSibling) && q(c) ? new l(c, 0) : a && q(a) ? new l(a, a.data.length) : new l(x, e.getNodeIndex(b));
        }
        b.parentNode.removeChild(b);
        return{boundaryPosition:c, nodeInfo:{nodeIndex:f, containerElement:x}};
      }, x = function(a, b) {
        var c, d, f = a.offset, r = e.getDocument(a.node), x = t(r).createTextRange(), l = q(a.node);
        l ? (c = a.node, d = c.parentNode) : (c = a.node.childNodes, c = f < c.length ? c[f] : null, d = a.node);
        r = r.createElement("span");
        r.innerHTML = "&#feff;";
        c ? d.insertBefore(r, c) : d.appendChild(r);
        x.moveToElementText(r);
        x.collapse(!b);
        d.removeChild(r);
        if (l) {
          x[b ? "moveStart" : "moveEnd"]("character", f);
        }
        return x;
      };
      d = function(a) {
        this.textRange = a;
        this.refresh();
      };
      d.prototype = new g(document);
      d.prototype.refresh = function() {
        var a, b, c;
        c = this.textRange;
        a = c.parentElement();
        var d = c.duplicate();
        d.collapse(!0);
        b = d.parentElement();
        d = c.duplicate();
        d.collapse(!1);
        c = d.parentElement();
        b = b == c ? b : e.getCommonAncestor(b, c);
        b = b == a ? b : e.getCommonAncestor(a, b);
        a = this.textRange;
        0 == a.compareEndPoints("StartToEnd", a) ? b = a = r(this.textRange, b, !0, !0).boundaryPosition : (c = r(this.textRange, b, !0, !1), a = c.boundaryPosition, b = r(this.textRange, b, !1, !1, c.nodeInfo).boundaryPosition);
        this.setStart(a.node, a.offset);
        this.setEnd(b.node, b.offset);
      };
      d.prototype.getName = function() {
        return "WrappedTextRange";
      };
      g.copyComparisonConstants(d);
      var F = function(a) {
        if (a.collapsed) {
          return x(new l(a.startContainer, a.startOffset), !0);
        }
        var b = x(new l(a.startContainer, a.startOffset), !0), c = x(new l(a.endContainer, a.endOffset), !1);
        a = t(g.getRangeDocument(a)).createTextRange();
        a.setEndPoint("StartToStart", b);
        a.setEndPoint("EndToEnd", c);
        return a;
      };
      d.rangeToTextRange = F;
      d.prototype.toTextRange = function() {
        return F(this);
      };
      a.WrappedTextRange = d;
      if (!a.features.implementsDomRange || a.config.preferTextRange) {
        var M = Function("return this;")();
        "undefined" == typeof M.Range && (M.Range = d);
        a.createNativeRange = function(a) {
          a = k(a, b, "createNativeRange");
          return t(a).createTextRange();
        };
        a.WrappedRange = d;
      }
    }
    a.createRange = function(c) {
      c = k(c, b, "createRange");
      return new a.WrappedRange(a.createNativeRange(c));
    };
    a.createRangyRange = function(a) {
      a = k(a, b, "createRangyRange");
      return new g(a);
    };
    a.createIframeRange = function(c) {
      b.deprecationNotice("createIframeRange()", "createRange(iframeEl)");
      return a.createRange(c);
    };
    a.createIframeRangyRange = function(c) {
      b.deprecationNotice("createIframeRangyRange()", "createRangyRange(iframeEl)");
      return a.createRangyRange(c);
    };
    a.addShimListener(function(b) {
      var c = b.document;
      "undefined" == typeof c.createRange && (c.createRange = function() {
        return a.createRange(c);
      });
      c = b = null;
    });
  });
  p.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(a, b) {
    function c(a) {
      return "string" == typeof a ? /^backward(s)?$/i.test(a) : !!a;
    }
    function d(a, c) {
      if (a) {
        if (z.isWindow(a)) {
          return a;
        }
        if (a instanceof h) {
          return a.win;
        }
        var e = z.getContentDocument(a, b, c);
        return z.getWindow(e);
      }
      return window;
    }
    function e(a) {
      return d(a, "getWinSelection").getSelection();
    }
    function f(a) {
      return d(a, "getDocSelection").document.selection;
    }
    function l(a) {
      var b = !1;
      a.anchorNode && (b = 1 == z.comparePoints(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset));
      return b;
    }
    function g(a, b, c) {
      var d = c ? "end" : "start";
      c = c ? "start" : "end";
      a.anchorNode = b[d + "Container"];
      a.anchorOffset = b[d + "Offset"];
      a.focusNode = b[c + "Container"];
      a.focusOffset = b[c + "Offset"];
    }
    function t(a) {
      a.anchorNode = a.focusNode = null;
      a.anchorOffset = a.focusOffset = 0;
      a.rangeCount = 0;
      a.isCollapsed = !0;
      a._ranges.length = 0;
    }
    function k(b) {
      var c;
      b instanceof N ? (c = a.createNativeRange(b.getDocument()), c.setEnd(b.endContainer, b.endOffset), c.setStart(b.startContainer, b.startOffset)) : b instanceof n ? c = b.nativeRange : S.implementsDomRange && b instanceof z.getWindow(b.startContainer).Range && (c = b);
      return c;
    }
    function q(a) {
      var c = a.getNodes(), d;
      a: {
        if (c.length && 1 == c[0].nodeType) {
          d = 1;
          for (var e = c.length;d < e;++d) {
            if (!z.isAncestorOf(c[0], c[d])) {
              d = !1;
              break a;
            }
          }
          d = !0;
        } else {
          d = !1;
        }
      }
      if (!d) {
        throw b.createError("getSingleElementFromRange: range " + a.inspect() + " did not consist of a single element");
      }
      return c[0];
    }
    function r(a) {
      return!!a && "undefined" != typeof a.text;
    }
    function x(a, b) {
      var c = new n(b);
      a._ranges = [c];
      g(a, c, !1);
      a.rangeCount = 1;
      a.isCollapsed = c.collapsed;
    }
    function F(b) {
      b._ranges.length = 0;
      if ("None" == b.docSelection.type) {
        t(b);
      } else {
        var c = b.docSelection.createRange();
        if (r(c)) {
          x(b, c);
        } else {
          b.rangeCount = c.length;
          for (var d, e = W(c.item(0)), n = 0;n < b.rangeCount;++n) {
            d = a.createRange(e), d.selectNode(c.item(n)), b._ranges.push(d);
          }
          b.isCollapsed = 1 == b.rangeCount && b._ranges[0].collapsed;
          g(b, b._ranges[b.rangeCount - 1], !1);
        }
      }
    }
    function M(a, c) {
      for (var d = a.docSelection.createRange(), e = q(c), n = W(d.item(0)), n = w(n).createControlRange(), f = 0, r = d.length;f < r;++f) {
        n.add(d.item(f));
      }
      try {
        n.add(e);
      } catch (T) {
        throw b.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
      }
      n.select();
      F(a);
    }
    function h(a, b, c) {
      this.nativeSelection = a;
      this.docSelection = b;
      this._ranges = [];
      this.win = c;
      this.refresh();
    }
    function L(a) {
      a.win = a.anchorNode = a.focusNode = a._ranges = null;
      a.rangeCount = a.anchorOffset = a.focusOffset = 0;
      a.detached = !0;
    }
    function B(a, b) {
      for (var c = X.length, d, e;c--;) {
        if (d = X[c], e = d.selection, "deleteAll" == b) {
          L(e);
        } else {
          if (d.win == a) {
            return "delete" == b ? (X.splice(c, 1), !0) : e;
          }
        }
      }
      "deleteAll" == b && (X.length = 0);
      return null;
    }
    function H(a, c) {
      for (var d = W(c[0].startContainer), d = w(d).createControlRange(), e = 0, n, f = c.length;e < f;++e) {
        n = q(c[e]);
        try {
          d.add(n);
        } catch (r) {
          throw b.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
        }
      }
      d.select();
      F(a);
    }
    function p(a, b) {
      if (a.win.document != W(b)) {
        throw new P("WRONG_DOCUMENT_ERR");
      }
    }
    function y(b) {
      return function(c, d) {
        var e;
        this.rangeCount ? (e = this.getRangeAt(0), e["set" + (b ? "Start" : "End")](c, d)) : (e = a.createRange(this.win.document), e.setStartAndEnd(c, d));
        this.setSingleRange(e, this.isBackward());
      };
    }
    function J(a) {
      var b = [], c = new T(a.anchorNode, a.anchorOffset), d = new T(a.focusNode, a.focusOffset), e = "function" == typeof a.getName ? a.getName() : "Selection";
      if ("undefined" != typeof a.rangeCount) {
        for (var n = 0, f = a.rangeCount;n < f;++n) {
          b[n] = N.inspect(a.getRangeAt(n));
        }
      }
      return "[" + e + "(Ranges: " + b.join(", ") + ")(anchor: " + c.inspect() + ", focus: " + d.inspect() + "]";
    }
    a.config.checkSelectionRanges = !0;
    var z = a.dom, m = a.util, C = m.isHostMethod, N = a.DomRange, n = a.WrappedRange, P = a.DOMException, T = z.DomPosition, ga, ka, S = a.features, W = z.getDocument, w = z.getBody, aa = N.rangesEqual, D = C(window, "getSelection"), I = m.isHostObject(document, "selection");
    S.implementsWinGetSelection = D;
    var u = (S.implementsDocSelection = I) && (!D || a.config.preferTextRange);
    u ? (ga = f, a.isSelectionValid = function(a) {
      a = d(a, "isSelectionValid").document;
      var b = a.selection;
      return "None" != b.type || W(b.createRange().parentElement()) == a;
    }) : D ? (ga = e, a.isSelectionValid = function() {
      return!0;
    }) : b.fail("Neither document.selection or window.getSelection() detected.");
    a.getNativeSelection = ga;
    var D = ga(), O = a.createNativeRange(document), v = w(document), K = m.areHostProperties(D, ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);
    S.selectionHasAnchorAndFocus = K;
    var A = C(D, "extend");
    S.selectionHasExtend = A;
    var E = "number" == typeof D.rangeCount;
    S.selectionHasRangeCount = E;
    var Q = !1, Ba = !0, ua = A ? function(b, c) {
      var d = N.getRangeDocument(c), d = a.createRange(d);
      d.collapseToPoint(c.endContainer, c.endOffset);
      b.addRange(k(d));
      b.extend(c.startContainer, c.startOffset);
    } : null;
    m.areHostMethods(D, ["addRange", "getRangeAt", "removeAllRanges"]) && "number" == typeof D.rangeCount && S.implementsDomRange && function() {
      var b = window.getSelection();
      if (b) {
        for (var c = b.rangeCount, d = 1 < c, e = [], n = l(b), f = 0;f < c;++f) {
          e[f] = b.getRangeAt(f);
        }
        var f = w(document), r = f.appendChild(document.createElement("div"));
        r.contentEditable = "false";
        var T = r.appendChild(document.createTextNode("\u00a0\u00a0\u00a0")), P = document.createRange();
        P.setStart(T, 1);
        P.collapse(!0);
        b.addRange(P);
        Ba = 1 == b.rangeCount;
        b.removeAllRanges();
        d || ((d = window.navigator.appVersion.match(/Chrome\/(.*?) /)) && 36 <= parseInt(d[1]) ? Q = !1 : (d = P.cloneRange(), P.setStart(T, 0), d.setEnd(T, 3), d.setStart(T, 2), b.addRange(P), b.addRange(d), Q = 2 == b.rangeCount));
        f.removeChild(r);
        b.removeAllRanges();
        for (f = 0;f < c;++f) {
          0 == f && n ? ua ? ua(b, e[f]) : (a.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend"), b.addRange(e[f])) : b.addRange(e[f]);
        }
      }
    }();
    S.selectionSupportsMultipleRanges = Q;
    S.collapsedNonEditableSelectionsSupported = Ba;
    var ha = !1;
    v && C(v, "createControlRange") && (v = v.createControlRange(), m.areHostProperties(v, ["item", "add"]) && (ha = !0));
    S.implementsControlRange = ha;
    ka = K ? function(a) {
      return a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset;
    } : function(a) {
      return a.rangeCount ? a.getRangeAt(a.rangeCount - 1).collapsed : !1;
    };
    var fa;
    C(D, "getRangeAt") ? fa = function(a, b) {
      try {
        return a.getRangeAt(b);
      } catch (c) {
        return null;
      }
    } : K && (fa = function(b) {
      var c = W(b.anchorNode), c = a.createRange(c);
      c.setStartAndEnd(b.anchorNode, b.anchorOffset, b.focusNode, b.focusOffset);
      c.collapsed !== this.isCollapsed && c.setStartAndEnd(b.focusNode, b.focusOffset, b.anchorNode, b.anchorOffset);
      return c;
    });
    h.prototype = a.selectionPrototype;
    var X = [], pa = function(a) {
      if (a && a instanceof h) {
        return a.refresh(), a;
      }
      a = d(a, "getNativeSelection");
      var b = B(a), c = ga(a), e = I ? f(a) : null;
      b ? (b.nativeSelection = c, b.docSelection = e, b.refresh()) : (b = new h(c, e, a), X.push({win:a, selection:b}));
      return b;
    };
    a.getSelection = pa;
    a.getIframeSelection = function(c) {
      b.deprecationNotice("getIframeSelection()", "getSelection(iframeEl)");
      return a.getSelection(z.getIframeWindow(c));
    };
    v = h.prototype;
    if (!u && K && m.areHostMethods(D, ["removeAllRanges", "addRange"])) {
      v.removeAllRanges = function() {
        this.nativeSelection.removeAllRanges();
        t(this);
      }, v.addRange = E ? function(b, d) {
        if (ha && I && "Control" == this.docSelection.type) {
          M(this, b);
        } else {
          if (c(d) && A) {
            ua(this.nativeSelection, b), this.refresh();
          } else {
            var e;
            Q ? e = this.rangeCount : (this.removeAllRanges(), e = 0);
            var f = k(b).cloneRange();
            try {
              this.nativeSelection.addRange(f);
            } catch (r) {
            }
            this.rangeCount = this.nativeSelection.rangeCount;
            this.rangeCount == e + 1 ? (a.config.checkSelectionRanges && (e = fa(this.nativeSelection, this.rangeCount - 1)) && !aa(e, b) && (b = new n(e)), this._ranges[this.rangeCount - 1] = b, g(this, b, ma(this.nativeSelection)), this.isCollapsed = ka(this)) : this.refresh();
          }
        }
      } : function(a, b) {
        c(b) && A ? ua(this.nativeSelection, a) : this.nativeSelection.addRange(k(a));
        this.refresh();
      }, v.setRanges = function(a) {
        if (ha && I && 1 < a.length) {
          H(this, a);
        } else {
          this.removeAllRanges();
          for (var b = 0, c = a.length;b < c;++b) {
            this.addRange(a[b]);
          }
        }
      };
    } else {
      if (C(D, "empty") && C(O, "select") && ha && u) {
        v.removeAllRanges = function() {
          try {
            if (this.docSelection.empty(), "None" != this.docSelection.type) {
              var a;
              if (this.anchorNode) {
                a = W(this.anchorNode);
              } else {
                if ("Control" == this.docSelection.type) {
                  var b = this.docSelection.createRange();
                  b.length && (a = W(b.item(0)));
                }
              }
              a && (w(a).createTextRange().select(), this.docSelection.empty());
            }
          } catch (c) {
          }
          t(this);
        }, v.addRange = function(b) {
          "Control" == this.docSelection.type ? M(this, b) : (a.WrappedTextRange.rangeToTextRange(b).select(), this._ranges[0] = b, this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, g(this, b, !1));
        }, v.setRanges = function(a) {
          this.removeAllRanges();
          var b = a.length;
          1 < b ? H(this, a) : b && this.addRange(a[0]);
        };
      } else {
        return b.fail("No means of selecting a Range or TextRange was found"), !1;
      }
    }
    v.getRangeAt = function(a) {
      if (0 > a || a >= this.rangeCount) {
        throw new P("INDEX_SIZE_ERR");
      }
      return this._ranges[a].cloneRange();
    };
    var la;
    if (u) {
      la = function(b) {
        var c;
        a.isSelectionValid(b.win) ? c = b.docSelection.createRange() : (c = w(b.win.document).createTextRange(), c.collapse(!0));
        "Control" == b.docSelection.type ? F(b) : r(c) ? x(b, c) : t(b);
      };
    } else {
      if (C(D, "getRangeAt") && "number" == typeof D.rangeCount) {
        la = function(b) {
          if (ha && I && "Control" == b.docSelection.type) {
            F(b);
          } else {
            if (b._ranges.length = b.rangeCount = b.nativeSelection.rangeCount, b.rangeCount) {
              for (var c = 0, d = b.rangeCount;c < d;++c) {
                b._ranges[c] = new a.WrappedRange(b.nativeSelection.getRangeAt(c));
              }
              g(b, b._ranges[b.rangeCount - 1], ma(b.nativeSelection));
              b.isCollapsed = ka(b);
            } else {
              t(b);
            }
          }
        };
      } else {
        if (K && "boolean" == typeof D.isCollapsed && "boolean" == typeof O.collapsed && S.implementsDomRange) {
          la = function(a) {
            var b;
            b = a.nativeSelection;
            b.anchorNode ? (b = fa(b, 0), a._ranges = [b], a.rangeCount = 1, b = a.nativeSelection, a.anchorNode = b.anchorNode, a.anchorOffset = b.anchorOffset, a.focusNode = b.focusNode, a.focusOffset = b.focusOffset, a.isCollapsed = ka(a)) : t(a);
          };
        } else {
          return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"), !1;
        }
      }
    }
    v.refresh = function(a) {
      var b = a ? this._ranges.slice(0) : null, c = this.anchorNode, d = this.anchorOffset;
      la(this);
      if (a) {
        a = b.length;
        if (a != this._ranges.length || this.anchorNode != c || this.anchorOffset != d) {
          return!0;
        }
        for (;a--;) {
          if (!aa(b[a], this._ranges[a])) {
            return!0;
          }
        }
        return!1;
      }
    };
    var qa = function(a, b) {
      var c = a.getAllRanges();
      a.removeAllRanges();
      for (var d = 0, e = c.length;d < e;++d) {
        aa(b, c[d]) || a.addRange(c[d]);
      }
      a.rangeCount || t(a);
    };
    v.removeRange = ha && I ? function(a) {
      if ("Control" == this.docSelection.type) {
        var b = this.docSelection.createRange();
        a = q(a);
        for (var c = W(b.item(0)), c = w(c).createControlRange(), d, e = !1, n = 0, f = b.length;n < f;++n) {
          d = b.item(n), d !== a || e ? c.add(b.item(n)) : e = !0;
        }
        c.select();
        F(this);
      } else {
        qa(this, a);
      }
    } : function(a) {
      qa(this, a);
    };
    var ma;
    !u && K && S.implementsDomRange ? (ma = l, v.isBackward = function() {
      return ma(this);
    }) : ma = v.isBackward = function() {
      return!1;
    };
    v.isBackwards = v.isBackward;
    v.toString = function() {
      for (var a = [], b = 0, c = this.rangeCount;b < c;++b) {
        a[b] = "" + this._ranges[b];
      }
      return a.join("");
    };
    v.collapse = function(b, c) {
      p(this, b);
      var d = a.createRange(b);
      d.collapseToPoint(b, c);
      this.setSingleRange(d);
      this.isCollapsed = !0;
    };
    v.collapseToStart = function() {
      if (this.rangeCount) {
        var a = this._ranges[0];
        this.collapse(a.startContainer, a.startOffset);
      } else {
        throw new P("INVALID_STATE_ERR");
      }
    };
    v.collapseToEnd = function() {
      if (this.rangeCount) {
        var a = this._ranges[this.rangeCount - 1];
        this.collapse(a.endContainer, a.endOffset);
      } else {
        throw new P("INVALID_STATE_ERR");
      }
    };
    v.selectAllChildren = function(b) {
      p(this, b);
      var c = a.createRange(b);
      c.selectNodeContents(b);
      this.setSingleRange(c);
    };
    v.deleteFromDocument = function() {
      if (ha && I && "Control" == this.docSelection.type) {
        for (var a = this.docSelection.createRange(), b;a.length;) {
          b = a.item(0), a.remove(b), b.parentNode.removeChild(b);
        }
        this.refresh();
      } else {
        if (this.rangeCount && (a = this.getAllRanges(), a.length)) {
          this.removeAllRanges();
          b = 0;
          for (var c = a.length;b < c;++b) {
            a[b].deleteContents();
          }
          this.addRange(a[c - 1]);
        }
      }
    };
    v.eachRange = function(a, b) {
      for (var c = 0, d = this._ranges.length;c < d;++c) {
        if (a(this.getRangeAt(c))) {
          return b;
        }
      }
    };
    v.getAllRanges = function() {
      var a = [];
      this.eachRange(function(b) {
        a.push(b);
      });
      return a;
    };
    v.setSingleRange = function(a, b) {
      this.removeAllRanges();
      this.addRange(a, b);
    };
    v.callMethodOnEachRange = function(a, b) {
      var c = [];
      this.eachRange(function(d) {
        c.push(d[a].apply(d, b));
      });
      return c;
    };
    v.setStart = y(!0);
    v.setEnd = y(!1);
    a.rangePrototype.select = function(a) {
      pa(this.getDocument()).setSingleRange(this, a);
    };
    v.changeEachRange = function(a) {
      var b = [], c = this.isBackward();
      this.eachRange(function(c) {
        a(c);
        b.push(c);
      });
      this.removeAllRanges();
      c && 1 == b.length ? this.addRange(b[0], "backward") : this.setRanges(b);
    };
    v.containsNode = function(a, b) {
      return this.eachRange(function(c) {
        return c.containsNode(a, b);
      }, !0) || !1;
    };
    v.getBookmark = function(a) {
      return{backward:this.isBackward(), rangeBookmarks:this.callMethodOnEachRange("getBookmark", [a])};
    };
    v.moveToBookmark = function(b) {
      for (var c = [], d = 0, e, n;e = b.rangeBookmarks[d++];) {
        n = a.createRange(this.win), n.moveToBookmark(e), c.push(n);
      }
      b.backward ? this.setSingleRange(c[0], "backward") : this.setRanges(c);
    };
    v.toHtml = function() {
      var a = [];
      this.eachRange(function(b) {
        a.push(N.toHtml(b));
      });
      return a.join("");
    };
    S.implementsTextRange && (v.getNativeTextRange = function() {
      var c;
      if (c = this.docSelection) {
        c = c.createRange();
        if (r(c)) {
          return c;
        }
        throw b.createError("getNativeTextRange: selection is a control selection");
      }
      if (0 < this.rangeCount) {
        return a.WrappedTextRange.rangeToTextRange(this.getRangeAt(0));
      }
      throw b.createError("getNativeTextRange: selection contains no range");
    });
    v.getName = function() {
      return "WrappedSelection";
    };
    v.inspect = function() {
      return J(this);
    };
    v.detach = function() {
      B(this.win, "delete");
      L(this);
    };
    h.detachAll = function() {
      B(null, "deleteAll");
    };
    h.inspect = J;
    h.isDirectionBackward = c;
    a.Selection = h;
    a.selectionPrototype = v;
    a.addShimListener(function(a) {
      "undefined" == typeof a.getSelection && (a.getSelection = function() {
        return pa(a);
      });
      a = null;
    });
  });
  var Q = !1, l = function(a) {
    Q || (Q = !0, !p.initialized && p.config.autoInitialize && m());
  };
  J && ("complete" == document.readyState ? l() : (a(document, "addEventListener") && document.addEventListener("DOMContentLoaded", l, !1), O(window, "load", l)));
  return p;
}, this);
(function(a, b) {
  "function" == typeof define && define.amd ? define(["./rangy-core"], a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a(require("rangy")) : a(b.rangy);
})(function(a) {
  a.createModule("ClassApplier", ["WrappedSelection"], function(a, c) {
    function d(a, b) {
      for (var c in a) {
        if (a.hasOwnProperty(c) && !1 === b(c, a[c])) {
          return!1;
        }
      }
      return!0;
    }
    function e(a) {
      return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    function f(a, b) {
      return a.className && (new RegExp("(?:^|\\s)" + b + "(?:\\s|$)")).test(a.className);
    }
    function g(a, b) {
      a.className ? f(a, b) || (a.className += " " + b) : a.className = b;
    }
    function h(a) {
      return a && a.split(/\s+/).sort().join(" ");
    }
    function m(a, b) {
      return h(a.className) == h(b.className);
    }
    function u(a, b, c, d) {
      -1 == c && (c = b.childNodes.length);
      for (var e = a.parentNode, f = w.getNodeIndex(a), l = 0, g;g = d[l++];) {
        var t = g.node, k = g.offset, q = t, h = k;
        t == b && k > c && ++h;
        t != e || k != f && k != f + 1 || (q = b, h += c - f);
        t == e && k > f + 1 && --h;
        g.node = q;
        g.offset = h;
      }
      b.childNodes.length == c ? b.appendChild(a) : b.insertBefore(a, b.childNodes[c]);
    }
    function E(a, b) {
      for (var c = a.parentNode, d = w.getNodeIndex(a), e = 0, f;f = b[e++];) {
        f.node == c && f.offset > d && --f.offset;
      }
      a.parentNode.removeChild(a);
    }
    function A(a, b) {
      for (var c = a.parentNode, d = w.getNodeIndex(a), e, f = [];e = a.firstChild;) {
        u(e, c, d++, b), f.push(e);
      }
      E(a, b);
      return f;
    }
    function y(a, b) {
      var c = a.cloneRange();
      c.selectNodeContents(b);
      c = c.intersection(a);
      return "" != (c ? c.toString() : "");
    }
    function C(a) {
      for (var b = a.getNodes([3]), c = 0, d;(d = b[c]) && !y(a, d);) {
        ++c;
      }
      for (var e = b.length - 1;(d = b[e]) && !y(a, d);) {
        --e;
      }
      return b.slice(c, e + 1);
    }
    function z(a, b) {
      if (a.attributes.length != b.attributes.length) {
        return!1;
      }
      for (var c = 0, d = a.attributes.length, e, f;c < d;++c) {
        if (e = a.attributes[c], f = e.name, "class" != f && (f = b.attributes.getNamedItem(f), null === e != (null === f) || e.specified != f.specified || e.specified && e.nodeValue !== f.nodeValue)) {
          return!1;
        }
      }
      return!0;
    }
    function k(a, b) {
      for (var c = 0, d = a.attributes.length, e;c < d;++c) {
        if (e = a.attributes[c].name, (!b || !V(b, e)) && a.attributes[c].specified && "class" != e) {
          return!0;
        }
      }
      return!1;
    }
    function q(a, b) {
      return d(b, function(b, c) {
        if ("object" == typeof c) {
          if (!q(a[b], c)) {
            return!1;
          }
        } else {
          if (a[b] !== c) {
            return!1;
          }
        }
      });
    }
    function B(a) {
      var b;
      return a && 1 == a.nodeType && ((b = a.parentNode) && 9 == b.nodeType && "on" == b.designMode || U(a) && !U(a.parentNode));
    }
    function l(a) {
      return(U(a) || 1 != a.nodeType && U(a.parentNode)) && !B(a);
    }
    function t(a) {
      return a && 1 == a.nodeType && !Z.test(Y(a, "display"));
    }
    function H(a) {
      if (0 == a.data.length) {
        return!0;
      }
      if (ja.test(a.data)) {
        return!1;
      }
      switch(Y(a.parentNode, "whiteSpace")) {
        case "pre":
        ;
        case "pre-wrap":
        ;
        case "-moz-pre-wrap":
          return!1;
        case "pre-line":
          if (/[\r\n]/.test(a.data)) {
            return!1;
          }
        ;
      }
      return t(a.previousSibling) || t(a.nextSibling);
    }
    function J(a) {
      var b = [], c, d;
      for (c = 0;d = a[c++];) {
        b.push(new Q(d.startContainer, d.startOffset), new Q(d.endContainer, d.endOffset));
      }
      return b;
    }
    function N(a, b) {
      for (var c = 0, d, e, f, l = a.length;c < l;++c) {
        d = a[c], e = b[2 * c], f = b[2 * c + 1], d.setStartAndEnd(e.node, e.offset, f.node, f.offset);
      }
    }
    function p(a, b, d, e) {
      var f, l;
      l = 0 == d;
      if (w.isAncestorOf(b, a)) {
        return a;
      }
      if (w.isCharacterDataNode(b)) {
        f = w.getNodeIndex(b);
        if (0 == d) {
          d = f;
        } else {
          if (d == b.length) {
            d = f + 1;
          } else {
            throw c.createError("splitNodeAt() should not be called with offset in the middle of a data node (" + d + " in " + b.data);
          }
        }
        b = b.parentNode;
      }
      f = b;
      var g = d;
      if (w.isCharacterDataNode(f) ? 0 == g ? f.previousSibling : g == f.length ? f.nextSibling : 1 : 0 < g && g < f.childNodes.length) {
        f = b.cloneNode(!1);
        l = b.parentNode;
        f.id && f.removeAttribute("id");
        for (var t = 0;g = b.childNodes[d];) {
          u(g, f, t++, e);
        }
        u(f, l, w.getNodeIndex(b) + 1, e);
        return b == a ? f : p(a, l, w.getNodeIndex(f), e);
      }
      return a != b ? (f = b.parentNode, b = w.getNodeIndex(b), l || b++, p(a, f, b, e)) : a;
    }
    function I(a) {
      var b = a ? "nextSibling" : "previousSibling";
      return function(c, d) {
        var e = c.parentNode, f = c[b];
        if (f) {
          if (f && 3 == f.nodeType) {
            return f;
          }
        } else {
          if (d) {
            var f = e[b], l;
            if (l = f && 1 == f.nodeType) {
              l = f, l = e.namespaceURI == l.namespaceURI && e.tagName.toLowerCase() == l.tagName.toLowerCase() && m(e, l) && z(e, l) && "inline" == Y(e, "display") && "inline" == Y(l, "display");
            }
            if (l && (e = f[a ? "firstChild" : "lastChild"]) && 3 == e.nodeType) {
              return e;
            }
          }
        }
        return null;
      };
    }
    function O(a) {
      this.isElementMerge = 1 == a.nodeType;
      this.textNodes = [];
      (a = this.isElementMerge ? a.lastChild : a) && (this.textNodes[0] = a);
    }
    function K(a, b, c) {
      var f, l, g = this;
      g.cssClass = g.className = a;
      var t = null, k = {};
      if ("object" == typeof b && null !== b) {
        c = b.tagNames;
        t = b.elementProperties;
        k = b.elementAttributes;
        for (f = 0;l = ta[f++];) {
          b.hasOwnProperty(l) && (g[l] = b[l]);
        }
        f = b.normalize;
      } else {
        f = b;
      }
      g.normalize = "undefined" == typeof f ? !0 : f;
      g.attrExceptions = [];
      f = document.createElement(g.elementTagName);
      g.elementProperties = g.copyPropertiesToElement(t, f, !0);
      d(k, function(a) {
        g.attrExceptions.push(a);
      });
      g.elementAttributes = k;
      g.elementSortedClassName = g.elementProperties.hasOwnProperty("className") ? g.elementProperties.className : a;
      g.applyToAnyTagName = !1;
      a = typeof c;
      if ("string" == a) {
        "*" == c ? g.applyToAnyTagName = !0 : g.tagNames = e(c.toLowerCase()).split(/\s*,\s*/);
      } else {
        if ("object" == a && "number" == typeof c.length) {
          for (g.tagNames = [], f = 0, a = c.length;f < a;++f) {
            "*" == c[f] ? g.applyToAnyTagName = !0 : g.tagNames.push(c[f].toLowerCase());
          }
        } else {
          g.tagNames = [g.elementTagName];
        }
      }
    }
    var w = a.dom, Q = w.DomPosition, V = w.arrayContains, ca = w.isHtmlNamespace, ia = function() {
      function a(b, c, d) {
        return c && d ? " " : "";
      }
      return function(b, c) {
        b.className && (b.className = b.className.replace(new RegExp("(^|\\s)" + c + "(\\s|$)"), a));
      };
    }(), Y = w.getComputedStyleProperty, U = function() {
      return "boolean" == typeof document.createElement("div").isContentEditable ? function(a) {
        return a && 1 == a.nodeType && a.isContentEditable;
      } : function(a) {
        return a && 1 == a.nodeType && "false" != a.contentEditable ? "true" == a.contentEditable || U(a.parentNode) : !1;
      };
    }(), Z = /^inline(-block|-table)?$/i, ja = /[^\r\n\t\f \u200B]/, da = I(!1), sa = I(!0);
    O.prototype = {doMerge:function(a) {
      var b = this.textNodes, c = b[0];
      if (1 < b.length) {
        for (var d = w.getNodeIndex(c), e = [], f = 0, l, g, t = 0, k = b.length, q, h;t < k;++t) {
          l = b[t];
          g = l.parentNode;
          if (0 < t && (g.removeChild(l), g.hasChildNodes() || g.parentNode.removeChild(g), a)) {
            for (q = 0;h = a[q++];) {
              h.node == l && (h.node = c, h.offset += f), h.node == g && h.offset > d && (--h.offset, h.offset == d + 1 && t < k - 1 && (h.node = c, h.offset = f));
            }
          }
          e[t] = l.data;
          f += l.data.length;
        }
        c.data = e.join("");
      }
      return c.data;
    }, getLength:function() {
      for (var a = this.textNodes.length, b = 0;a--;) {
        b += this.textNodes[a].length;
      }
      return b;
    }, toString:function() {
      for (var a = [], b = 0, c = this.textNodes.length;b < c;++b) {
        a[b] = "'" + this.textNodes[b].data + "'";
      }
      return "[Merge(" + a.join(",") + ")]";
    }};
    var ta = "elementTagName ignoreWhiteSpace applyToEditableOnly useExistingElements removeEmptyElements onElementCreate".split(" "), na = {};
    K.prototype = {elementTagName:"span", elementProperties:{}, elementAttributes:{}, ignoreWhiteSpace:!0, applyToEditableOnly:!1, useExistingElements:!0, removeEmptyElements:!0, onElementCreate:null, copyPropertiesToElement:function(a, b, c) {
      var d, e, f = {}, l, t, k;
      for (k in a) {
        if (a.hasOwnProperty(k)) {
          if (t = a[k], e = b[k], "className" == k) {
            g(b, t), g(b, this.className), b[k] = h(b[k]), c && (f[k] = b[k]);
          } else {
            if ("style" == k) {
              c && (f[k] = l = {});
              for (d in a[k]) {
                e[d] = t[d], c && (l[d] = e[d]);
              }
              this.attrExceptions.push(k);
            } else {
              b[k] = t, c && (f[k] = b[k], t = na.hasOwnProperty(k) ? na[k] : k, this.attrExceptions.push(t));
            }
          }
        }
      }
      return c ? f : "";
    }, copyAttributesToElement:function(a, b) {
      for (var c in a) {
        a.hasOwnProperty(c) && b.setAttribute(c, a[c]);
      }
    }, hasClass:function(a) {
      return 1 == a.nodeType && V(this.tagNames, a.tagName.toLowerCase()) && f(a, this.className);
    }, getSelfOrAncestorWithClass:function(a) {
      for (;a;) {
        if (this.hasClass(a)) {
          return a;
        }
        a = a.parentNode;
      }
      return null;
    }, isModifiable:function(a) {
      return!this.applyToEditableOnly || l(a);
    }, isIgnorableWhiteSpaceNode:function(a) {
      return this.ignoreWhiteSpace && a && 3 == a.nodeType && H(a);
    }, postApply:function(a, b, c, d) {
      for (var e = a[0], f = a[a.length - 1], l = [], g, t = e, k = f, q = 0, h = f.length, B, H, p = 0, n = a.length;p < n;++p) {
        B = a[p], (H = da(B, !d)) ? (g || (g = new O(H), l.push(g)), g.textNodes.push(B), B === e && (t = g.textNodes[0], q = t.length), B === f && (k = g.textNodes[0], h = g.getLength())) : g = null;
      }
      if (a = sa(f, !d)) {
        g || (g = new O(f), l.push(g)), g.textNodes.push(a);
      }
      if (l.length) {
        p = 0;
        for (n = l.length;p < n;++p) {
          l[p].doMerge(c);
        }
        b.setStartAndEnd(t, q, k, h);
      }
    }, createContainer:function(a) {
      a = a.createElement(this.elementTagName);
      this.copyPropertiesToElement(this.elementProperties, a, !1);
      this.copyAttributesToElement(this.elementAttributes, a);
      g(a, this.className);
      if (this.onElementCreate) {
        this.onElementCreate(a, this);
      }
      return a;
    }, applyToTextNode:function(a, b) {
      var c = a.parentNode;
      1 == c.childNodes.length && this.useExistingElements && ca(c) && V(this.tagNames, c.tagName.toLowerCase()) && q(c, this.elementProperties) ? g(c, this.className) : (c = this.createContainer(w.getDocument(a)), a.parentNode.insertBefore(c, a), c.appendChild(a));
    }, isRemovable:function(a) {
      return ca(a) && a.tagName.toLowerCase() == this.elementTagName && h(a.className) == this.elementSortedClassName && q(a, this.elementProperties) && !k(a, this.attrExceptions) && this.isModifiable(a);
    }, isEmptyContainer:function(a) {
      var b = a.childNodes.length;
      return 1 == a.nodeType && this.isRemovable(a) && (0 == b || 1 == b && this.isEmptyContainer(a.firstChild));
    }, removeEmptyContainers:function(a) {
      var b = this, c = a.getNodes([1], function(a) {
        return b.isEmptyContainer(a);
      });
      a = [a];
      for (var d = J(a), e = 0, f;f = c[e++];) {
        E(f, d);
      }
      N(a, d);
    }, undoToTextNode:function(a, b, c, d) {
      b.containsNode(c) || (a = b.cloneRange(), a.selectNode(c), a.isPointInRange(b.endContainer, b.endOffset) && (p(c, b.endContainer, b.endOffset, d), b.setEndAfter(c)), a.isPointInRange(b.startContainer, b.startOffset) && (c = p(c, b.startContainer, b.startOffset, d)));
      this.isRemovable(c) ? A(c, d) : ia(c, this.className);
    }, applyToRange:function(a, b) {
      b = b || [];
      var c = J(b || []);
      a.splitBoundariesPreservingPositions(c);
      this.removeEmptyElements && this.removeEmptyContainers(a);
      var d = C(a);
      if (d.length) {
        for (var e = 0, f;f = d[e++];) {
          this.isIgnorableWhiteSpaceNode(f) || this.getSelfOrAncestorWithClass(f) || !this.isModifiable(f) || this.applyToTextNode(f, c);
        }
        f = d[d.length - 1];
        a.setStartAndEnd(d[0], 0, f, f.length);
        this.normalize && this.postApply(d, a, c, !1);
        N(b, c);
      }
    }, applyToRanges:function(a) {
      for (var b = a.length;b--;) {
        this.applyToRange(a[b], a);
      }
      return a;
    }, applyToSelection:function(c) {
      c = a.getSelection(c);
      c.setRanges(this.applyToRanges(c.getAllRanges()));
    }, undoToRange:function(a, b) {
      b = b || [];
      var c = J(b);
      a.splitBoundariesPreservingPositions(c);
      this.removeEmptyElements && this.removeEmptyContainers(a, c);
      var d = C(a), e, f, l = d[d.length - 1];
      if (d.length) {
        for (var g = 0, t = d.length;g < t;++g) {
          e = d[g], (f = this.getSelfOrAncestorWithClass(e)) && this.isModifiable(e) && this.undoToTextNode(e, a, f, c), a.setStartAndEnd(d[0], 0, l, l.length);
        }
        this.normalize && this.postApply(d, a, c, !0);
        N(b, c);
      }
    }, undoToRanges:function(a) {
      for (var b = a.length;b--;) {
        this.undoToRange(a[b], a);
      }
      return a;
    }, undoToSelection:function(c) {
      var d = a.getSelection(c);
      c = a.getSelection(c).getAllRanges();
      this.undoToRanges(c);
      d.setRanges(c);
    }, isAppliedToRange:function(a) {
      if (a.collapsed || "" == a.toString()) {
        return!!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);
      }
      var b = a.getNodes([3]);
      if (b.length) {
        for (var c = 0, d;d = b[c++];) {
          if (!this.isIgnorableWhiteSpaceNode(d) && y(a, d) && this.isModifiable(d) && !this.getSelfOrAncestorWithClass(d)) {
            return!1;
          }
        }
      }
      return!0;
    }, isAppliedToRanges:function(a) {
      var b = a.length;
      if (0 == b) {
        return!1;
      }
      for (;b--;) {
        if (!this.isAppliedToRange(a[b])) {
          return!1;
        }
      }
      return!0;
    }, isAppliedToSelection:function(c) {
      c = a.getSelection(c);
      return this.isAppliedToRanges(c.getAllRanges());
    }, toggleRange:function(a) {
      this.isAppliedToRange(a) ? this.undoToRange(a) : this.applyToRange(a);
    }, toggleSelection:function(a) {
      this.isAppliedToSelection(a) ? this.undoToSelection(a) : this.applyToSelection(a);
    }, getElementsWithClassIntersectingRange:function(a) {
      var b = [], c = this;
      a.getNodes([3], function(a) {
        (a = c.getSelfOrAncestorWithClass(a)) && !V(b, a) && b.push(a);
      });
      return b;
    }, detach:function() {
    }};
    K.util = {hasClass:f, addClass:g, removeClass:ia, hasSameClasses:m, replaceWithOwnChildren:A, elementsHaveSameNonClassAttributes:z, elementHasNonClassAttributes:k, splitNodeAt:p, isEditableElement:U, isEditingHost:B, isEditable:l};
    a.CssClassApplier = a.ClassApplier = K;
    a.createCssClassApplier = a.createClassApplier = function(a, b, c) {
      return new K(a, b, c);
    };
  });
}, this);
(function(a, b) {
  "function" == typeof define && define.amd ? define(["./rangy-core"], a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a(require("rangy")) : a(b.rangy);
})(function(a) {
  a.createModule("SaveRestore", ["WrappedRange"], function(a, c) {
    function d(a, b) {
      var c = "selectionBoundary_" + +new Date + "_" + ("" + Math.random()).slice(2), d, e = A.getDocument(a.startContainer), f = a.cloneRange();
      f.collapse(b);
      d = e.createElement("span");
      d.id = c;
      d.style.lineHeight = "0";
      d.style.display = "none";
      d.className = "rangySelectionBoundary";
      d.appendChild(e.createTextNode("\ufeff"));
      f.insertNode(d);
      return d;
    }
    function e(a, b, d, e) {
      (a = (a || document).getElementById(d)) ? (b[e ? "setStartBefore" : "setEndBefore"](a), a.parentNode.removeChild(a)) : c.warn("Marker element has been removed. Cannot restore selection.");
    }
    function f(a, b) {
      return b.compareBoundaryPoints(a.START_TO_START, a);
    }
    function g(c, e) {
      var f, g, q = a.DomRange.getRangeDocument(c), h = c.toString();
      if (c.collapsed) {
        return g = d(c, !1), {document:q, markerId:g.id, collapsed:!0};
      }
      g = d(c, !1);
      f = d(c, !0);
      return{document:q, startMarkerId:f.id, endMarkerId:g.id, collapsed:!1, backward:e, toString:function() {
        return "original text: '" + h + "', new text: '" + c.toString() + "'";
      }};
    }
    function h(d, f) {
      var g = d.document;
      "undefined" == typeof f && (f = !0);
      var k = a.createRange(g);
      if (d.collapsed) {
        if (g = (g || document).getElementById(d.markerId)) {
          g.style.display = "inline";
          var q = g.previousSibling;
          q && 3 == q.nodeType ? (g.parentNode.removeChild(g), k.collapseToPoint(q, q.length)) : (k.collapseBefore(g), g.parentNode.removeChild(g));
        } else {
          c.warn("Marker element has been removed. Cannot restore selection.");
        }
      } else {
        e(g, k, d.startMarkerId, !0), e(g, k, d.endMarkerId, !1);
      }
      f && k.normalizeBoundaries();
      return k;
    }
    function m(c, d) {
      var e = [], k, q;
      c = c.slice(0);
      c.sort(f);
      var h = 0;
      for (k = c.length;h < k;++h) {
        e[h] = g(c[h], d);
      }
      for (h = k - 1;0 <= h;--h) {
        k = c[h], q = a.DomRange.getRangeDocument(k), k.collapsed ? k.collapseAfter((q || document).getElementById(e[h].markerId)) : (k.setEndBefore((q || document).getElementById(e[h].endMarkerId)), k.setStartAfter((q || document).getElementById(e[h].startMarkerId)));
      }
      return e;
    }
    function u(a) {
      for (var b = [], c = a.length - 1;0 <= c;c--) {
        b[c] = h(a[c], !0);
      }
      return b;
    }
    function E(a, b) {
      var c = (a || document).getElementById(b);
      c && c.parentNode.removeChild(c);
    }
    var A = a.dom;
    a.util.extend(a, {saveRange:g, restoreRange:h, saveRanges:m, restoreRanges:u, saveSelection:function(d) {
      if (!a.isSelectionValid(d)) {
        return c.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."), null;
      }
      var e = a.getSelection(d), f = e.getAllRanges(), g = 1 == f.length && e.isBackward(), h = m(f, g);
      g ? e.setSingleRange(f[0], "backward") : e.setRanges(f);
      return{win:d, rangeInfos:h, restored:!1};
    }, restoreSelection:function(c, d) {
      if (!c.restored) {
        var e = c.rangeInfos, f = a.getSelection(c.win), g = u(e);
        1 == e.length && d && a.features.selectionHasExtend && e[0].backward ? (f.removeAllRanges(), f.addRange(g[0], !0)) : f.setRanges(g);
        c.restored = !0;
      }
    }, removeMarkerElement:E, removeMarkers:function(a) {
      for (var b = a.rangeInfos, c = 0, d = b.length, e;c < d;++c) {
        e = b[c], e.collapsed ? E(a.doc, e.markerId) : (E(a.doc, e.startMarkerId), E(a.doc, e.endMarkerId));
      }
    }});
  });
}, this);
(function(a, b) {
  "function" == typeof define && define.amd ? define(["./rangy-core"], a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a(require("rangy")) : a(b.rangy);
})(function(a) {
  a.createModule("Serializer", ["WrappedSelection"], function(a, c) {
    function d(a, b) {
      b = b || [];
      var c = a.nodeType, e = a.childNodes, f = e.length, g = [c, a.nodeName, f].join(":"), h = "", m = "";
      switch(c) {
        case 3:
          h = a.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          break;
        case 8:
          h = "\x3c!--" + a.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "--\x3e";
          break;
        default:
          h = "<" + g + ">", m = "</>";
      }
      h && b.push(h);
      for (c = 0;c < f;++c) {
        d(e[c], b);
      }
      m && b.push(m);
      return b;
    }
    function e(a) {
      a = d(a).join("");
      return y(a).toString(16);
    }
    function f(a, b, c) {
      var d = [], e = a;
      for (c = c || C.getDocument(a).documentElement;e && e != c;) {
        d.push(C.getNodeIndex(e, !0)), e = e.parentNode;
      }
      return d.join("/") + ":" + b;
    }
    function g(a, b, d) {
      b || (b = (d || document).documentElement);
      a = a.split(":");
      d = a[0] ? a[0].split("/") : [];
      for (var e = d.length, f;e--;) {
        if (f = parseInt(d[e], 10), f < b.childNodes.length) {
          b = b.childNodes[f];
        } else {
          throw c.createError("deserializePosition() failed: node " + C.inspectNode(b) + " has no child with index " + f + ", " + e);
        }
      }
      return new C.DomPosition(b, parseInt(a[1], 10));
    }
    function h(d, g, h) {
      h = h || a.DomRange.getRangeDocument(d).documentElement;
      if (!C.isOrIsAncestorOf(h, d.commonAncestorContainer)) {
        throw c.createError("serializeRange(): range " + d.inspect() + " is not wholly contained within specified root node " + C.inspectNode(h));
      }
      d = f(d.startContainer, d.startOffset, h) + "," + f(d.endContainer, d.endOffset, h);
      g || (d += "{" + e(h) + "}");
      return d;
    }
    function m(d, f, h) {
      f ? h = h || C.getDocument(f) : (h = h || document, f = h.documentElement);
      d = z.exec(d);
      var l = d[4];
      if (l) {
        var t = e(f);
        if (l !== t) {
          throw c.createError("deserializeRange(): checksums of serialized range root node (" + l + ") and target root node (" + t + ") do not match");
        }
      }
      l = g(d[1], f, h);
      f = g(d[2], f, h);
      h = a.createRange(h);
      h.setStartAndEnd(l.node, l.offset, f.node, f.offset);
      return h;
    }
    function u(a, b, c) {
      b || (b = (c || document).documentElement);
      a = z.exec(a)[3];
      return!a || a === e(b);
    }
    function E(c, d, e) {
      c = a.getSelection(c);
      c = c.getAllRanges();
      for (var f = [], g = 0, H = c.length;g < H;++g) {
        f[g] = h(c[g], d, e);
      }
      return f.join("|");
    }
    function A(c, d, e) {
      d ? e = e || C.getWindow(d) : (e = e || window, d = e.document.documentElement);
      c = c.split("|");
      for (var f = a.getSelection(e), g = [], h = 0, J = c.length;h < J;++h) {
        g[h] = m(c[h], d, e.document);
      }
      f.setRanges(g);
      return f;
    }
    "undefined" != typeof encodeURIComponent && "undefined" != typeof decodeURIComponent || c.fail("encodeURIComponent and/or decodeURIComponent method is missing");
    var y = function() {
      var a = null;
      return function(b) {
        for (var c = [], d = 0, e = b.length, f;d < e;++d) {
          f = b.charCodeAt(d), 128 > f ? c.push(f) : 2048 > f ? c.push(f >> 6 | 192, f & 63 | 128) : c.push(f >> 12 | 224, f >> 6 & 63 | 128, f & 63 | 128);
        }
        b = -1;
        if (!a) {
          for (var d = [], e = 0, g;256 > e;++e) {
            g = e;
            for (f = 8;f--;) {
              g = 1 == (g & 1) ? g >>> 1 ^ 3988292384 : g >>> 1;
            }
            d[e] = g >>> 0;
          }
          a = d;
        }
        d = a;
        e = 0;
        for (f = c.length;e < f;++e) {
          g = (b ^ c[e]) & 255, b = b >>> 8 ^ d[g];
        }
        return(b ^ -1) >>> 0;
      };
    }(), C = a.dom, z = /^([^,]+),([^,\{]+)(\{([^}]+)\})?$/;
    a.serializePosition = f;
    a.deserializePosition = g;
    a.serializeRange = h;
    a.deserializeRange = m;
    a.canDeserializeRange = u;
    a.serializeSelection = E;
    a.deserializeSelection = A;
    a.canDeserializeSelection = function(a, b, c) {
      var d;
      b ? d = c ? c.document : C.getDocument(b) : (c = c || window, b = c.document.documentElement);
      a = a.split("|");
      c = 0;
      for (var e = a.length;c < e;++c) {
        if (!u(a[c], b, d)) {
          return!1;
        }
      }
      return!0;
    };
    a.restoreSelectionFromCookie = function(a) {
      a = a || window;
      var b;
      a: {
        b = a.document.cookie.split(/[;,]/);
        for (var c = 0, d = b.length, e;c < d;++c) {
          if (e = b[c].split("="), "rangySerializedSelection" == e[0].replace(/^\s+/, "") && (e = e[1])) {
            b = decodeURIComponent(e.replace(/\s+$/, ""));
            break a;
          }
        }
        b = null;
      }
      b && A(b, a.doc);
    };
    a.saveSelectionCookie = function(c, d) {
      c = c || window;
      d = "object" == typeof d ? d : {};
      var e = d.expires ? ";expires=" + d.expires.toUTCString() : "", f = d.path ? ";path=" + d.path : "", g = d.domain ? ";domain=" + d.domain : "", h = d.secure ? ";secure" : "", m = E(a.getSelection(c));
      c.document.cookie = encodeURIComponent("rangySerializedSelection") + "=" + encodeURIComponent(m) + e + f + g + h;
    };
    a.getElementChecksum = e;
    a.nodeToInfoString = d;
  });
}, this);
(function(a, b) {
  "function" == typeof define && define.amd ? define(["./rangy-core"], a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a(require("rangy")) : a(b.rangy);
})(function(a) {
  a.createModule("Highlighter", ["ClassApplier"], function(a, c) {
    function d(a, b) {
      return a.characterRange.start - b.characterRange.start;
    }
    function e(a, b) {
      this.type = a;
      this.converterCreator = b;
    }
    function f(a, b) {
      q[a] = new e(a, b);
    }
    function g(a) {
      var b = q[a];
      if (b instanceof e) {
        return b.create();
      }
      throw Error("Highlighter type '" + a + "' is not valid");
    }
    function h(a, b) {
      this.start = a;
      this.end = b;
    }
    function m(a, b, c, d, e, f) {
      e ? (this.id = e, k = Math.max(k, e + 1)) : this.id = k++;
      this.characterRange = b;
      this.doc = a;
      this.classApplier = c;
      this.converter = d;
      this.containerElementId = f || null;
      this.applied = !1;
    }
    function u(a, b) {
      this.doc = a || document;
      this.classAppliers = {};
      this.highlights = [];
      this.converter = g(b || "textContent");
    }
    var E = a.dom, A = E.arrayContains, y = E.getBody, C = a.util.createOptions, z = [].forEach ? function(a, b) {
      a.forEach(b);
    } : function(a, b) {
      for (var c = 0, d = a.length;c < d;++c) {
        b(a[c]);
      }
    }, k = 1, q = {};
    e.prototype.create = function() {
      var a = this.converterCreator();
      a.type = this.type;
      return a;
    };
    a.registerHighlighterType = f;
    h.prototype = {intersects:function(a) {
      return this.start < a.end && this.end > a.start;
    }, isContiguousWith:function(a) {
      return this.start == a.end || this.end == a.start;
    }, union:function(a) {
      return new h(Math.min(this.start, a.start), Math.max(this.end, a.end));
    }, intersection:function(a) {
      return new h(Math.max(this.start, a.start), Math.min(this.end, a.end));
    }, getComplements:function(a) {
      var b = [];
      if (this.start >= a.start) {
        if (this.end <= a.end) {
          return[];
        }
        b.push(new h(a.end, this.end));
      } else {
        b.push(new h(this.start, Math.min(this.end, a.start))), this.end > a.end && b.push(new h(a.end, this.end));
      }
      return b;
    }, toString:function() {
      return "[CharacterRange(" + this.start + ", " + this.end + ")]";
    }};
    h.fromCharacterRange = function(a) {
      return new h(a.start, a.end);
    };
    var B = {rangeToCharacterRange:function(a, b) {
      var c = a.getBookmark(b);
      return new h(c.start, c.end);
    }, characterRangeToRange:function(c, d, e) {
      c = a.createRange(c);
      c.moveToBookmark({start:d.start, end:d.end, containerNode:e});
      return c;
    }, serializeSelection:function(a, b) {
      for (var c = a.getAllRanges(), d = [], e = 1 == c.length && a.isBackward(), f = 0, g = c.length;f < g;++f) {
        d[f] = {characterRange:this.rangeToCharacterRange(c[f], b), backward:e};
      }
      return d;
    }, restoreSelection:function(a, b, c) {
      a.removeAllRanges();
      for (var d = a.win.document, e = 0, f = b.length, g, h;e < f;++e) {
        h = b[e], g = this.characterRangeToRange(d, h.characterRange, c), a.addRange(g, h.backward);
      }
    }};
    f("textContent", function() {
      return B;
    });
    f("TextRange", function() {
      var c;
      return function() {
        if (!c) {
          var d = a.modules.TextRange;
          if (!d) {
            throw Error("TextRange module is missing.");
          }
          if (!d.supported) {
            throw Error("TextRange module is present but not supported.");
          }
          c = {rangeToCharacterRange:function(a, b) {
            return h.fromCharacterRange(a.toCharacterRange(b));
          }, characterRangeToRange:function(c, d, e) {
            c = a.createRange(c);
            c.selectCharacters(e, d.start, d.end);
            return c;
          }, serializeSelection:function(a, b) {
            return a.saveCharacterRanges(b);
          }, restoreSelection:function(a, b, c) {
            a.restoreCharacterRanges(c, b);
          }};
        }
        return c;
      };
    }());
    m.prototype = {getContainerElement:function() {
      return this.containerElementId ? this.doc.getElementById(this.containerElementId) : y(this.doc);
    }, getRange:function() {
      return this.converter.characterRangeToRange(this.doc, this.characterRange, this.getContainerElement());
    }, fromRange:function(a) {
      this.characterRange = this.converter.rangeToCharacterRange(a, this.getContainerElement());
    }, getText:function() {
      return this.getRange().toString();
    }, containsElement:function(a) {
      return this.getRange().containsNodeContents(a.firstChild);
    }, unapply:function() {
      this.classApplier.undoToRange(this.getRange());
      this.applied = !1;
    }, apply:function() {
      this.classApplier.applyToRange(this.getRange());
      this.applied = !0;
    }, getHighlightElements:function() {
      return this.classApplier.getElementsWithClassIntersectingRange(this.getRange());
    }, toString:function() {
      return "[Highlight(ID: " + this.id + ", class: " + this.classApplier.className + ", character range: " + this.characterRange.start + " - " + this.characterRange.end + ")]";
    }};
    u.prototype = {addClassApplier:function(a) {
      this.classAppliers[a.className] = a;
    }, getHighlightForElement:function(a) {
      for (var b = this.highlights, c = 0, d = b.length;c < d;++c) {
        if (b[c].containsElement(a)) {
          return b[c];
        }
      }
      return null;
    }, removeHighlights:function(a) {
      for (var b = 0, c = this.highlights.length, d;b < c;++b) {
        d = this.highlights[b], A(a, d) && (d.unapply(), this.highlights.splice(b--, 1));
      }
    }, removeAllHighlights:function() {
      this.removeHighlights(this.highlights);
    }, getIntersectingHighlights:function(a) {
      var b = [], c = this.highlights;
      z(a, function(a) {
        z(c, function(c) {
          a.intersectsRange(c.getRange()) && !A(b, c) && b.push(c);
        });
      });
      return b;
    }, highlightCharacterRanges:function(c, d, e) {
      var f, g, p, k = this.highlights, q = this.converter, u = this.doc, w = [];
      c = c ? this.classAppliers[c] : null;
      e = C(e, {containerElementId:null, exclusive:!0});
      var y = e.containerElementId;
      e = e.exclusive;
      var B;
      y && (f = this.doc.getElementById(y)) && (B = a.createRange(this.doc), B.selectNodeContents(f), B = new h(0, B.toString().length));
      var A, E, Y, U, Z, ja;
      f = 0;
      for (g = d.length;f < g;++f) {
        if (A = d[f], Z = [], B && (A = A.intersection(B)), A.start != A.end) {
          for (p = 0;p < k.length;++p) {
            Y = !1, y == k[p].containerElementId && (E = k[p].characterRange, U = c == k[p].classApplier, ja = !U && e, (E.intersects(A) || E.isContiguousWith(A)) && (U || ja) && (ja && z(E.getComplements(A), function(a) {
              Z.push(new m(u, a, k[p].classApplier, q, null, y));
            }), Y = !0, U && (A = E.union(A)))), Y ? (w.push(k[p]), k[p] = new m(u, E.union(A), c, q, null, y)) : Z.push(k[p]);
          }
          c && Z.push(new m(u, A, c, q, null, y));
          this.highlights = k = Z;
        }
      }
      z(w, function(a) {
        a.unapply();
      });
      var da = [];
      z(k, function(a) {
        a.applied || (a.apply(), da.push(a));
      });
      return da;
    }, highlightRanges:function(c, d, e) {
      var f = [], g = this.converter;
      e = C(e, {containerElement:null, exclusive:!0});
      var h = e.containerElement, k = h ? h.id : null, m;
      h && (m = a.createRange(h), m.selectNodeContents(h));
      z(d, function(a) {
        var b = h ? m.intersection(a) : a;
        f.push(g.rangeToCharacterRange(b, h || y(a.getDocument())));
      });
      return this.highlightCharacterRanges(c, f, {containerElementId:k, exclusive:e.exclusive});
    }, highlightSelection:function(c, d) {
      var e = this.converter, f = c ? this.classAppliers[c] : !1;
      d = C(d, {containerElementId:null, selection:a.getSelection(), exclusive:!0});
      var g = d.containerElementId, k = d.exclusive, m = d.selection, q = m.win.document, q = g ? q.getElementById(g) : y(q);
      if (!f && !1 !== c) {
        throw Error("No class applier found for class '" + c + "'");
      }
      var f = e.serializeSelection(m, q), u = [];
      z(f, function(a) {
        u.push(h.fromCharacterRange(a.characterRange));
      });
      g = this.highlightCharacterRanges(c, u, {containerElementId:g, exclusive:k});
      e.restoreSelection(m, f, q);
      return g;
    }, unhighlightSelection:function(c) {
      c = c || a.getSelection();
      var d = this.getIntersectingHighlights(c.getAllRanges());
      this.removeHighlights(d);
      c.removeAllRanges();
      return d;
    }, getHighlightsInSelection:function(c) {
      c = c || a.getSelection();
      return this.getIntersectingHighlights(c.getAllRanges());
    }, selectionOverlapsHighlight:function(a) {
      return 0 < this.getHighlightsInSelection(a).length;
    }, serialize:function(a) {
      var b = this.highlights;
      b.sort(d);
      var c = ["type:" + this.converter.type];
      a = C(a, {serializeHighlightText:!1});
      z(b, function(b) {
        var d = b.characterRange, d = [d.start, d.end, b.id, b.classApplier.className, b.containerElementId];
        a.serializeHighlightText && d.push(b.getText());
        c.push(d.join("$"));
      });
      return c.join("|");
    }, deserialize:function(a) {
      a = a.split("|");
      var b = [], c = a[0], d, e, f = !1;
      if (c && (d = /^type:(\w+)$/.exec(c))) {
        d = d[1], d != this.converter.type && (e = g(d), f = !0), a.shift();
      } else {
        throw Error("Serialized highlights are invalid.");
      }
      var k, q;
      d = a.length;
      for (var u;0 < d--;) {
        u = a[d].split("$");
        c = new h(+u[0], +u[1]);
        k = (q = u[4] || null) ? this.doc.getElementById(q) : y(this.doc);
        f && (c = this.converter.rangeToCharacterRange(e.characterRangeToRange(this.doc, c, k), k));
        k = this.classAppliers[u[3]];
        if (!k) {
          throw Error("No class applier found for class '" + u[3] + "'");
        }
        c = new m(this.doc, c, k, this.converter, parseInt(u[2]), q);
        c.apply();
        b.push(c);
      }
      this.highlights = b;
    }};
    a.Highlighter = u;
    a.createHighlighter = function(a, b) {
      return new u(a, b);
    };
  });
}, this);
(function(a, b) {
  "function" == typeof define && define.amd ? define(["./rangy-core"], a) : "undefined" != typeof module && "object" == typeof exports ? module.exports = a(require("rangy")) : a(b.rangy);
})(function(a) {
  a.createModule("TextRange", ["WrappedSelection"], function(a, c) {
    function d(a) {
      a = a || "";
      a = "string" == typeof a ? a.split("") : a;
      a.sort(function(a, b) {
        return a.charCodeAt(0) - b.charCodeAt(0);
      });
      return a.join("").replace(/(.)\1+/g, "$1");
    }
    function e(a, b) {
      var c = ca(a, b);
      if (b.hasOwnProperty("wordOptions")) {
        var d;
        d = c.wordOptions;
        var e, f;
        d ? (e = d.language || "en", f = {}, V(f, x[e] || x.en), V(f, d), d = f) : d = x.en;
        c.wordOptions = d;
      }
      b.hasOwnProperty("characterOptions") && (c.characterOptions = ca(c.characterOptions, na));
      return c;
    }
    function f(a, b) {
      var c = R(a, "display", b), d = a.tagName.toLowerCase();
      return "block" == c && va && za.hasOwnProperty(d) ? za[d] : c;
    }
    function g(a) {
      for (var b = a, c = [];b.parentNode;) {
        c.unshift(b.parentNode), b = b.parentNode;
      }
      a = c.concat([a]);
      b = 0;
      for (c = a.length;b < c;++b) {
        if (1 == a[b].nodeType && "none" == f(a[b])) {
          return!0;
        }
      }
      return!1;
    }
    function h(a, b) {
      if (!b && a.hasChildNodes()) {
        return a.firstChild;
      }
      var c;
      for (c = a;c && !c.nextSibling;) {
        c = c.parentNode;
      }
      c = c ? c.nextSibling : null;
      return c;
    }
    function m(a) {
      var b = a.previousSibling;
      if (b) {
        for (a = b;a.hasChildNodes();) {
          a = a.lastChild;
        }
        return a;
      }
      return(a = a.parentNode) && 1 == a.nodeType ? a : null;
    }
    function u(a) {
      if (!a || 3 != a.nodeType) {
        return!1;
      }
      var b = a.data;
      if ("" === b) {
        return!0;
      }
      var c = a.parentNode;
      if (!c || 1 != c.nodeType) {
        return!1;
      }
      a = R(a.parentNode, "whiteSpace");
      return/^[\t\n\r ]+$/.test(b) && /^(normal|nowrap)$/.test(a) || /^[\t\r ]+$/.test(b) && "pre-line" == a;
    }
    function E(a) {
      return "" === a.data ? !0 : u(a) ? !a.parentNode || g(a) ? !0 : !1 : !1;
    }
    function A(a) {
      var b = a.nodeType;
      if (!(b = 7 == b || 8 == b || g(a) || /^(script|style)$/i.test(a.nodeName))) {
        var c, b = 3 == a.nodeType && (c = a.parentNode) && "hidden" == R(c, "visibility")
      }
      return b || E(a);
    }
    function y(a, b) {
      var c = a.nodeType;
      return 7 == c || 8 == c || 1 == c && "none" == f(a, b);
    }
    function C() {
      this.store = {};
    }
    function z(a, b, c) {
      return function(d) {
        var e = this.cache;
        if (e.hasOwnProperty(a)) {
          return Ea++, e[a];
        }
        Da++;
        d = b.call(this, c ? this[c] : this, d);
        return e[a] = d;
      };
    }
    function k(a, b) {
      this.node = a;
      this.session = b;
      this.cache = new C;
      this.positions = new C;
    }
    function q(a, b) {
      this.offset = b;
      this.nodeWrapper = a;
      this.node = a.node;
      this.session = a.session;
      this.cache = new C;
    }
    function B() {
      l();
      return ea = new ra;
    }
    function l() {
      ea && ea.detach();
      ea = null;
    }
    function t(a, b, d, e) {
      function f() {
        var a = null;
        b ? (a = g, h || (g = g.previousVisible(), h = !g || d && g.equals(d))) : h || (a = g = g.nextVisible(), h = !g || d && g.equals(d));
        h && (g = null);
        return a;
      }
      d && (b ? A(d.node) && (d = a.previousVisible()) : A(d.node) && (d = d.nextVisible()));
      var g = a, h = !1, k, l = !1;
      return{next:function() {
        if (l) {
          return l = !1, k;
        }
        for (var a, b;a = f();) {
          if (b = a.getCharacter(e)) {
            return k = a;
          }
        }
        return null;
      }, rewind:function() {
        if (k) {
          l = !0;
        } else {
          throw c.createError("createCharacterIterator: cannot rewind. Only one position can be rewound.");
        }
      }, dispose:function() {
        a = d = null;
      }};
    }
    function H(a, b, c) {
      function d(a) {
        for (var b, c = [], n = a ? e : f, g = !1, h = !1;a = n.next();) {
          b = a.character;
          if (Z.test(b)) {
            h && (h = !1, g = !0);
          } else {
            if (g) {
              n.rewind();
              break;
            } else {
              h = !0;
            }
          }
          c.push(a);
        }
        return c;
      }
      var e = t(a, !1, null, b), f = t(a, !0, null, b), g = c.tokenizer;
      a = d(!0);
      b = d(!1).reverse();
      var h = g(b.concat(a), c), k = a.length ? h.slice(Aa(h, a[0].token)) : [], l = b.length ? h.slice(0, Aa(h, b.pop().token) + 1) : [];
      return{nextEndToken:function() {
        for (var a, b;1 == k.length && !(a = k[0]).isWord && 0 < (b = d(!0)).length;) {
          k = g(a.chars.concat(b), c);
        }
        return k.shift();
      }, previousStartToken:function() {
        for (var a, b;1 == l.length && !(a = l[0]).isWord && 0 < (b = d(!1)).length;) {
          l = g(b.reverse().concat(a.chars), c);
        }
        return l.pop();
      }, dispose:function() {
        e.dispose();
        f.dispose();
        k = l = null;
      }};
    }
    function J(a, b, c, d) {
      var e = a.getRangeBoundaryPosition(b, !0);
      a = a.getRangeBoundaryPosition(b, !1);
      return t(d ? a : e, !!d, d ? e : a, c);
    }
    function N(c, d, e, f, g) {
      function h(c, d) {
        var e = l[c].previousVisible(), f = l[d - 1], n;
        if (!(n = !g.wholeWordsOnly)) {
          n = g.wordOptions;
          var P = a.createRange(e.node);
          P.setStartAndEnd(e.node, e.offset, f.node, f.offset);
          n = !P.expand("word", n);
        }
        return{startPos:e, endPos:f, valid:n};
      }
      var k = da(g.direction);
      c = t(c, k, c.session.getRangeBoundaryPosition(f, k), g.characterOptions);
      f = "";
      for (var l = [], m, p, q, r, u, v = null;m = c.next();) {
        if (p = m.character, e || g.caseSensitive || (p = p.toLowerCase()), k ? (l.unshift(m), f = p + f) : (l.push(m), f += p), e) {
          if (m = d.exec(f)) {
            if (q = m.index, r = q + m[0].length, u) {
              if (!k && r < f.length || k && 0 < q) {
                v = h(q, r);
                break;
              }
            } else {
              u = !0;
            }
          }
        } else {
          if (-1 != (q = f.indexOf(d))) {
            v = h(q, q + d.length);
            break;
          }
        }
      }
      u && (v = h(q, r));
      c.dispose();
      return v;
    }
    function p(a) {
      return function() {
        var b = !!ea, c = [ea || B()].concat(Q.toArray(arguments)), c = a.apply(this, c);
        b || l();
        return c;
      };
    }
    function I(a, b) {
      return p(function(c, d, f, g) {
        var h;
        "undefined" == typeof f && (f = d, d = "character");
        g = e(g, M);
        var k = a;
        b && (k = 0 <= f, this.collapse(!k));
        c = c.getRangeBoundaryPosition(this, k);
        var l = f;
        f = g.characterOptions;
        var m = g.wordOptions;
        g = 0;
        var p = c, q = Math.abs(l);
        if (0 !== l) {
          l = 0 > l;
          switch(d) {
            case "character":
              for (m = t(c, l, null, f);(h = m.next()) && g < q;) {
                ++g, p = h;
              }
              m.dispose();
              break;
            case "word":
              for (var m = H(c, f, m), r = l ? m.previousStartToken : m.nextEndToken;(m = r()) && g < q;) {
                m.isWord && (++g, p = l ? m.chars[0] : m.chars[m.chars.length - 1]);
              }
              break;
            default:
              throw Error("movePositionBy: unit '" + d + "' not implemented");;
          }
          l ? (p = p.previousVisible(), g = -g) : p && p.isLeadingSpace && ("word" == d && (m = t(c, !1, null, f), h = m.next(), m.dispose()), h && (p = h.previousVisible()));
        }
        c = p;
        h = g;
        this[k ? "setStart" : "setEnd"](c.node, c.offset);
        return h;
      });
    }
    function O(a) {
      return p(function(b, c) {
        c = ca(c, na);
        for (var d, e = J(b, this, c, !a), f = 0;(d = e.next()) && Z.test(d.character);) {
          ++f;
        }
        e.dispose();
        if (d = 0 < f) {
          this[a ? "moveStart" : "moveEnd"]("character", a ? f : -f, {characterOptions:c});
        }
        return d;
      });
    }
    function K(a) {
      return p(function(b, c) {
        var d = !1;
        this.changeEachRange(function(b) {
          d = b[a](c) || d;
        });
        return d;
      });
    }
    var w = a.dom, Q = a.util, V = Q.extend, ca = Q.createOptions, ia = w.getBody, Y = /^[ \t\f\r\n]+$/, U = /^[ \t\f\r]+$/, Z = /^[\t-\r \u0085\u00A0\u1680\u180E\u2000-\u200B\u2028\u2029\u202F\u205F\u3000]+$/, ja = /^[\t \u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000]+$/, da = a.Selection.isDirectionBackward, sa = !1, ta = !1;
    (function() {
      var c = document.createElement("div");
      c.contentEditable = "true";
      c.innerHTML = "<p>1 </p><p></p>";
      var d = ia(document), e = c.firstChild, f = a.getSelection();
      d.appendChild(c);
      f.collapse(e.lastChild, 2);
      f.setStart(e.firstChild, 0);
      c.innerHTML = "1 <br />";
      f.collapse(c, 2);
      f.setStart(c.firstChild, 0);
      sa = 1 == ("" + f).length;
      c.innerHTML = "1 <p>1</p>";
      f.collapse(c, 2);
      f.setStart(c.firstChild, 0);
      ta = 1 == ("" + f).length;
      d.removeChild(c);
      f.removeAllRanges();
    })();
    var na = {includeBlockContentTrailingSpace:!0, includeSpaceBeforeBr:!0, includeSpaceBeforeBlock:!0, includePreLineTrailingSpace:!0, ignoreCharacters:""}, r = {includeBlockContentTrailingSpace:!1, includeSpaceBeforeBr:!sa, includeSpaceBeforeBlock:!ta, includePreLineTrailingSpace:!0}, x = {en:{wordRegex:/[a-z0-9]+('[a-z0-9]+)*/gi, includeTrailingSpace:!1, tokenizer:function(a, b) {
      function c(b, d, e) {
        var g = a.slice(b, d);
        b = {isWord:e, chars:g, toString:function() {
          return g.join("");
        }};
        d = 0;
        for (e = g.length;d < e;++d) {
          g[d].token = b;
        }
        f.push(b);
      }
      for (var d = a.join(""), e, f = [], g = 0, h;e = b.wordRegex.exec(d);) {
        h = e.index;
        e = h + e[0].length;
        h > g && c(g, h, !1);
        if (b.includeTrailingSpace) {
          for (;ja.test(a[e]);) {
            ++e;
          }
        }
        c(h, e, !0);
        g = e;
      }
      g < a.length && c(g, a.length, !1);
      return f;
    }}}, F = {caseSensitive:!1, withinRange:null, wholeWordsOnly:!1, wrap:!1, direction:"forward", wordOptions:null, characterOptions:null}, M = {wordOptions:null, characterOptions:null}, ba = {wordOptions:null, characterOptions:null, trim:!1, trimStart:!0, trimEnd:!0}, L = {wordOptions:null, characterOptions:null, direction:"forward"}, R = w.getComputedStyleProperty, va;
    (function() {
      var a = document.createElement("table"), b = ia(document);
      b.appendChild(a);
      va = "block" == R(a, "display");
      b.removeChild(a);
    })();
    a.features.tableCssDisplayBlock = va;
    var za = {table:"table", caption:"table-caption", colgroup:"table-column-group", col:"table-column", thead:"table-header-group", tbody:"table-row-group", tfoot:"table-footer-group", tr:"table-row", td:"table-cell", th:"table-cell"};
    C.prototype = {get:function(a) {
      return this.store.hasOwnProperty(a) ? this.store[a] : null;
    }, set:function(a, b) {
      return this.store[a] = b;
    }};
    var Ea = 0, Da = 0, oa = {getPosition:function(a) {
      var b = this.positions;
      return b.get(a) || b.set(a, new q(this, a));
    }, toString:function() {
      return "[NodeWrapper(" + w.inspectNode(this.node) + ")]";
    }};
    k.prototype = oa;
    V(oa, {isCharacterDataNode:z("isCharacterDataNode", w.isCharacterDataNode, "node"), getNodeIndex:z("nodeIndex", w.getNodeIndex, "node"), getLength:z("nodeLength", w.getNodeLength, "node"), containsPositions:z("containsPositions", function(a) {
      return w.isCharacterDataNode(a) || !/^(area|base|basefont|br|col|frame|hr|img|input|isindex|link|meta|param)$/i.test(a.nodeName);
    }, "node"), isWhitespace:z("isWhitespace", u, "node"), isCollapsedWhitespace:z("isCollapsedWhitespace", E, "node"), getComputedDisplay:z("computedDisplay", f, "node"), isCollapsed:z("collapsed", A, "node"), isIgnored:z("ignored", y, "node"), next:z("nextPos", h, "node"), previous:z("previous", m, "node"), getTextNodeInfo:z("textNodeInfo", function(a) {
      var b = null, c = !1, d = R(a.parentNode, "whiteSpace"), e = "pre-line" == d;
      if (e) {
        b = U, c = !0;
      } else {
        if ("normal" == d || "nowrap" == d) {
          b = Y, c = !0;
        }
      }
      return{node:a, text:a.data, spaceRegex:b, collapseSpaces:c, preLine:e};
    }, "node"), hasInnerText:z("hasInnerText", function(a, b) {
      for (var c = this.session, d = c.getPosition(a.parentNode, this.getNodeIndex() + 1), e = c.getPosition(a, 0), c = b ? d : e, d = b ? e : d;c !== d;) {
        c.prepopulateChar();
        if (c.isDefinitelyNonEmpty()) {
          return!0;
        }
        c = b ? c.previousVisible() : c.nextVisible();
      }
      return!1;
    }, "node"), isRenderedBlock:z("isRenderedBlock", function(a) {
      a = a.getElementsByTagName("br");
      for (var b = 0, c = a.length;b < c;++b) {
        if (!A(a[b])) {
          return!0;
        }
      }
      return this.hasInnerText();
    }, "node"), getTrailingSpace:z("trailingSpace", function(a) {
      if ("br" != a.tagName.toLowerCase()) {
        switch(this.getComputedDisplay()) {
          case "inline":
            for (a = a.lastChild;a;) {
              if (!y(a)) {
                return 1 == a.nodeType ? this.session.getNodeWrapper(a).getTrailingSpace() : "";
              }
              a = a.previousSibling;
            }
            break;
          case "inline-block":
          ;
          case "inline-table":
          ;
          case "none":
          ;
          case "table-column":
          ;
          case "table-column-group":
            break;
          case "table-cell":
            return "\t";
          default:
            return this.isRenderedBlock(!0) ? "\n" : "";
        }
      }
      return "";
    }, "node"), getLeadingSpace:z("leadingSpace", function(a) {
      switch(this.getComputedDisplay()) {
        case "inline":
        ;
        case "inline-block":
        ;
        case "inline-table":
        ;
        case "none":
        ;
        case "table-column":
        ;
        case "table-column-group":
        ;
        case "table-cell":
          break;
        default:
          return this.isRenderedBlock(!1) ? "\n" : "";
      }
      return "";
    }, "node")});
    oa = {character:"", characterType:"EMPTY", isBr:!1, prepopulateChar:function() {
      if (!this.prepopulatedChar) {
        var a = this.node, b = this.offset, c = "", d = "EMPTY", e = !1;
        if (0 < b) {
          if (3 == a.nodeType) {
            var a = a.data, f = a.charAt(b - 1), g = this.nodeWrapper.getTextNodeInfo(), h = g.spaceRegex;
            g.collapseSpaces ? h.test(f) ? 1 < b && h.test(a.charAt(b - 2)) || (g.preLine && "\n" === a.charAt(b) ? (c = " ", d = "PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK") : (c = " ", d = "COLLAPSIBLE_SPACE")) : (c = f, d = "NON_SPACE", e = !0) : (c = f, d = "UNCOLLAPSIBLE_SPACE", e = !0);
          } else {
            (f = a.childNodes[b - 1]) && 1 == f.nodeType && !A(f) && ("br" == f.tagName.toLowerCase() ? (c = "\n", this.isBr = !0, d = "COLLAPSIBLE_SPACE", e = !1) : this.checkForTrailingSpace = !0), c || (b = a.childNodes[b]) && 1 == b.nodeType && !A(b) && (this.checkForLeadingSpace = !0);
          }
        }
        this.prepopulatedChar = !0;
        this.character = c;
        this.characterType = d;
        this.isCharInvariant = e;
      }
    }, isDefinitelyNonEmpty:function() {
      var a = this.characterType;
      return "NON_SPACE" == a || "UNCOLLAPSIBLE_SPACE" == a;
    }, resolveLeadingAndTrailingSpaces:function() {
      this.prepopulatedChar || this.prepopulateChar();
      if (this.checkForTrailingSpace) {
        var a = this.session.getNodeWrapper(this.node.childNodes[this.offset - 1]).getTrailingSpace();
        a && (this.isTrailingSpace = !0, this.character = a, this.characterType = "COLLAPSIBLE_SPACE");
        this.checkForTrailingSpace = !1;
      }
      if (this.checkForLeadingSpace) {
        if (a = this.session.getNodeWrapper(this.node.childNodes[this.offset]).getLeadingSpace()) {
          this.isLeadingSpace = !0, this.character = a, this.characterType = "COLLAPSIBLE_SPACE";
        }
        this.checkForLeadingSpace = !1;
      }
    }, getPrecedingUncollapsedPosition:function(a) {
      for (var b = this, c;b = b.previousVisible();) {
        if (c = b.getCharacter(a), "" !== c) {
          return b;
        }
      }
      return null;
    }, getCharacter:function(a) {
      function b() {
        l || (k = m.getPrecedingUncollapsedPosition(a), l = !0);
        return k;
      }
      this.resolveLeadingAndTrailingSpaces();
      var c = this.character, e = d(a.ignoreCharacters), f = "" !== c && -1 < e.indexOf(c);
      if (this.isCharInvariant) {
        return f ? "" : c;
      }
      var f = ["character", a.includeSpaceBeforeBr, a.includeBlockContentTrailingSpace, a.includePreLineTrailingSpace, e].join("_"), g = this.cache.get(f);
      if (null !== g) {
        return g;
      }
      var g = "", h, k, l = !1, m = this;
      if ("COLLAPSIBLE_SPACE" == this.characterType) {
        if (" " != c || b() && !k.isTrailingSpace && "\n" != k.character) {
          if ("\n" == c && this.isLeadingSpace) {
            b() && "\n" != k.character && (g = "\n");
          } else {
            if (h = this.nextUncollapsed()) {
              if (h.isBr ? this.type = "TRAILING_SPACE_BEFORE_BR" : h.isTrailingSpace && "\n" == h.character ? this.type = "TRAILING_SPACE_IN_BLOCK" : h.isLeadingSpace && "\n" == h.character && (this.type = "TRAILING_SPACE_BEFORE_BLOCK"), "\n" == h.character) {
                if ("TRAILING_SPACE_BEFORE_BR" != this.type || a.includeSpaceBeforeBr) {
                  if ("TRAILING_SPACE_BEFORE_BLOCK" != this.type || a.includeSpaceBeforeBlock) {
                    if ("TRAILING_SPACE_IN_BLOCK" != this.type || !h.isTrailingSpace || a.includeBlockContentTrailingSpace) {
                      if ("PRE_LINE_TRAILING_SPACE_BEFORE_LINE_BREAK" != this.type || "NON_SPACE" != h.type || a.includePreLineTrailingSpace) {
                        "\n" == c ? h.isTrailingSpace ? !this.isTrailingSpace && this.isBr && (h.type = "TRAILING_LINE_BREAK_AFTER_BR", b() && k.isLeadingSpace && "\n" == k.character && (h.character = "")) : g = "\n" : " " == c && (g = " ");
                      }
                    }
                  }
                }
              } else {
                g = c;
              }
            }
          }
        }
      } else {
        "\n" != c || (h = this.nextUncollapsed());
      }
      -1 < e.indexOf(g) && (g = "");
      this.cache.set(f, g);
      return g;
    }, equals:function(a) {
      return!!a && this.node === a.node && this.offset === a.offset;
    }, inspect:function() {
      return "[Position(" + w.inspectNode(this.node) + ":" + this.offset + ")]";
    }, toString:function() {
      return this.character;
    }};
    q.prototype = oa;
    V(oa, {next:z("nextPos", function(a) {
      var b = a.nodeWrapper, c = a.node, d = a.offset;
      a = b.session;
      if (!c) {
        return null;
      }
      d == b.getLength() ? b = (c = c.parentNode) ? b.getNodeIndex() + 1 : 0 : b.isCharacterDataNode() ? b = d + 1 : (b = c.childNodes[d], a.getNodeWrapper(b).containsPositions() ? (c = b, b = 0) : b = d + 1);
      return c ? a.getPosition(c, b) : null;
    }), previous:z("previous", function(a) {
      var b = a.nodeWrapper, c = a.node, d = a.offset;
      a = b.session;
      0 == d ? b = (c = c.parentNode) ? b.getNodeIndex() : 0 : b.isCharacterDataNode() ? b = d - 1 : (b = c.childNodes[d - 1], a.getNodeWrapper(b).containsPositions() ? (c = b, b = w.getNodeLength(b)) : b = d - 1);
      return c ? a.getPosition(c, b) : null;
    }), nextVisible:z("nextVisible", function(a) {
      var b = a.next();
      if (!b) {
        return null;
      }
      a = b.nodeWrapper;
      var c = b.node;
      a.isCollapsed() && (b = a.session.getPosition(c.parentNode, a.getNodeIndex() + 1));
      return b;
    }), nextUncollapsed:z("nextUncollapsed", function(a) {
      for (;a = a.nextVisible();) {
        if (a.resolveLeadingAndTrailingSpaces(), "" !== a.character) {
          return a;
        }
      }
      return null;
    }), previousVisible:z("previousVisible", function(a) {
      var b = a.previous();
      if (!b) {
        return null;
      }
      a = b.nodeWrapper;
      var c = b.node;
      a.isCollapsed() && (b = a.session.getPosition(c.parentNode, a.getNodeIndex()));
      return b;
    })});
    var ea = null, ra = function() {
      function a(b) {
        var c = new C;
        return{get:function(a) {
          var d = c.get(a[b]);
          if (d) {
            for (var e = 0, f;f = d[e++];) {
              if (f.node === a) {
                return f;
              }
            }
          }
          return null;
        }, set:function(a) {
          var d = a.node[b];
          (c.get(d) || c.set(d, [])).push(a);
        }};
      }
      function b() {
        this.initCaches();
      }
      var c = Q.isHostProperty(document.documentElement, "uniqueID");
      b.prototype = {initCaches:function() {
        this.elementCache = c ? function() {
          var a = new C;
          return{get:function(b) {
            return a.get(b.uniqueID);
          }, set:function(b) {
            a.set(b.node.uniqueID, b);
          }};
        }() : a("tagName");
        this.textNodeCache = a("data");
        this.otherNodeCache = a("nodeName");
      }, getNodeWrapper:function(a) {
        var b;
        switch(a.nodeType) {
          case 1:
            b = this.elementCache;
            break;
          case 3:
            b = this.textNodeCache;
            break;
          default:
            b = this.otherNodeCache;
        }
        var c = b.get(a);
        c || (c = new k(a, this), b.set(c));
        return c;
      }, getPosition:function(a, b) {
        return this.getNodeWrapper(a).getPosition(b);
      }, getRangeBoundaryPosition:function(a, b) {
        var c = b ? "start" : "end";
        return this.getPosition(a[c + "Container"], a[c + "Offset"]);
      }, detach:function() {
        this.elementCache = this.textNodeCache = this.otherNodeCache = null;
      }};
      return b;
    }();
    V(w, {nextNode:h, previousNode:m});
    var Aa = Array.prototype.indexOf ? function(a, b) {
      return a.indexOf(b);
    } : function(a, b) {
      for (var c = 0, d = a.length;c < d;++c) {
        if (a[c] === b) {
          return c;
        }
      }
      return-1;
    };
    V(a.rangePrototype, {moveStart:I(!0, !1), moveEnd:I(!1, !1), move:I(!0, !0), trimStart:O(!0), trimEnd:O(!1), trim:p(function(a, b) {
      var c = this.trimStart(b), d = this.trimEnd(b);
      return c || d;
    }), expand:p(function(a, b, c) {
      var d = !1;
      c = e(c, ba);
      var f = c.characterOptions;
      b || (b = "character");
      if ("word" == b) {
        var g = c.wordOptions;
        b = a.getRangeBoundaryPosition(this, !0);
        a = a.getRangeBoundaryPosition(this, !1);
        var h = H(b, f, g).nextEndToken(), k = h.chars[0].previousVisible(), g = this.collapsed ? h : H(a, f, g).previousStartToken(), g = g.chars[g.chars.length - 1];
        k.equals(b) || (this.setStart(k.node, k.offset), d = !0);
        g && !g.equals(a) && (this.setEnd(g.node, g.offset), d = !0);
        c.trim && (c.trimStart && (d = this.trimStart(f) || d), c.trimEnd && (d = this.trimEnd(f) || d));
        return d;
      }
      return this.moveEnd("character", 1, c);
    }), text:p(function(a, b) {
      var c;
      if (this.collapsed) {
        c = "";
      } else {
        var d = ca(b, na);
        c = [];
        for (var d = J(a, this, d), e;e = d.next();) {
          c.push(e);
        }
        d.dispose();
        c = c.join("");
      }
      return c;
    }), selectCharacters:p(function(a, b, c, d, e) {
      a = {characterOptions:e};
      b || (b = ia(this.getDocument()));
      this.selectNodeContents(b);
      this.collapse(!0);
      this.moveStart("character", c, a);
      this.collapse(!0);
      this.moveEnd("character", d - c, a);
    }), toCharacterRange:p(function(a, b, c) {
      b || (b = ia(this.getDocument()));
      a = b.parentNode;
      b = w.getNodeIndex(b);
      var d = -1 == w.comparePoints(this.startContainer, this.endContainer, a, b), e = this.cloneRange();
      d ? (e.setStartAndEnd(this.startContainer, this.startOffset, a, b), a = -e.text(c).length) : (e.setStartAndEnd(a, b, this.startContainer, this.startOffset), a = e.text(c).length);
      c = a + this.text(c).length;
      return{start:a, end:c};
    }), findText:p(function(c, d, f) {
      f = e(f, F);
      f.wholeWordsOnly && (f.wordOptions.includeTrailingSpace = !1);
      var g = da(f.direction), h = f.withinRange;
      h || (h = a.createRange(), h.selectNodeContents(this.getDocument()));
      var k = !1;
      "string" == typeof d ? f.caseSensitive || (d = d.toLowerCase()) : k = !0;
      var l = c.getRangeBoundaryPosition(this, !g), m = h.comparePoint(l.node, l.offset);
      -1 === m ? l = c.getRangeBoundaryPosition(h, !0) : 1 === m && (l = c.getRangeBoundaryPosition(h, !1));
      for (var p = l, m = !1;;) {
        if (p = N(p, d, k, h, f)) {
          if (p.valid) {
            return this.setStartAndEnd(p.startPos.node, p.startPos.offset, p.endPos.node, p.endPos.offset), !0;
          }
          p = g ? p.startPos : p.endPos;
        } else {
          if (f.wrap && !m) {
            h = h.cloneRange(), p = c.getRangeBoundaryPosition(h, !g), h.setBoundary(l.node, l.offset, g), m = !0;
          } else {
            return!1;
          }
        }
      }
    }), pasteHtml:function(a) {
      this.deleteContents();
      if (a) {
        a = this.createContextualFragment(a);
        var b = a.lastChild;
        this.insertNode(a);
        this.collapseAfter(b);
      }
    }});
    V(a.selectionPrototype, {expand:p(function(a, b, c) {
      this.changeEachRange(function(a) {
        a.expand(b, c);
      });
    }), move:p(function(a, b, c, d) {
      a = 0;
      if (this.focusNode) {
        this.collapse(this.focusNode, this.focusOffset);
        var e = this.getRangeAt(0);
        d || (d = {});
        d.characterOptions = ca(d.characterOptions, r);
        a = e.move(b, c, d);
        this.setSingleRange(e);
      }
      return a;
    }), trimStart:K("trimStart"), trimEnd:K("trimEnd"), trim:K("trim"), selectCharacters:p(function(c, d, e, f, g, h) {
      c = a.createRange(d);
      c.selectCharacters(d, e, f, h);
      this.setSingleRange(c, g);
    }), saveCharacterRanges:p(function(a, b, c) {
      a = this.getAllRanges();
      for (var d = [], e = 1 == a.length && this.isBackward(), f = 0, g = a.length;f < g;++f) {
        d[f] = {characterRange:a[f].toCharacterRange(b, c), backward:e, characterOptions:c};
      }
      return d;
    }), restoreCharacterRanges:p(function(c, d, e) {
      this.removeAllRanges();
      c = 0;
      for (var f = e.length, g, h, k;c < f;++c) {
        h = e[c], k = h.characterRange, g = a.createRange(d), g.selectCharacters(d, k.start, k.end, h.characterOptions), this.addRange(g, h.backward);
      }
    }), text:p(function(a, b) {
      for (var c = [], d = 0, e = this.rangeCount;d < e;++d) {
        c[d] = this.getRangeAt(d).text(b);
      }
      return c.join("");
    })});
    a.innerText = function(c, d) {
      var e = a.createRange(c);
      e.selectNodeContents(c);
      return e.text(d);
    };
    a.createWordIterator = function(a, b, c) {
      var d = ea || B();
      c = e(c, L);
      a = d.getPosition(a, b);
      var f = H(a, c.characterOptions, c.wordOptions), g = da(c.direction);
      return{next:function() {
        return g ? f.previousStartToken() : f.nextEndToken();
      }, dispose:function() {
        f.dispose();
        this.next = function() {
        };
      }};
    };
    a.noMutation = function(a) {
      var b = ea || B();
      a(b);
      l();
    };
    a.noMutation.createEntryPointFunction = p;
    a.textRange = {isBlockNode:function(a) {
      return a && (1 == a.nodeType && !/^(inline(-block|-table)?|none)$/.test(f(a)) || 9 == a.nodeType || 11 == a.nodeType);
    }, isCollapsedWhitespaceNode:E, createPosition:p(function(a, b, c) {
      return a.getPosition(b, c);
    })};
  });
}, this);

