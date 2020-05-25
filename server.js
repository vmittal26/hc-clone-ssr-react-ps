/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8312307b207d9f290e46";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/server/index.tsx")(__webpack_require__.s = "./src/server/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/App.tsx":
/*!****************************!*\
  !*** ./src/client/App.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_Home_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/Home/Home */ \"./src/client/pages/Home/Home.tsx\");\n\r\n\r\n\r\nfunction App() {\r\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], { exact: true, path: \"/\", component: _pages_Home_Home__WEBPACK_IMPORTED_MODULE_2__[\"Home\"] })));\r\n}\r\n\n\n//# sourceURL=webpack:///./src/client/App.tsx?");

/***/ }),

/***/ "./src/client/Html.tsx":
/*!*****************************!*\
  !*** ./src/client/Html.tsx ***!
  \*****************************/
/*! exports provided: Html */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Html\", function() { return Html; });\n/* harmony import */ var _utils_getGlobalStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getGlobalStyles */ \"./src/client/utils/getGlobalStyles.ts\");\n\r\nvar Html = function (_a) {\r\n    var appHtml = _a.appHtml, styles = _a.styles, title = _a.title;\r\n    return \"\\n  <!DOCTYPE html>\\n  <html>\\n    <head>\\n      <title>\" + title + \"</title>\\n      <meta charSet='utf-8' />\\n      <meta\\n      name=\\\"description\\\"\\n      content=\\\"Hacker News Clone app\\\"\\n      />\\n      <style>\\n      \" + Object(_utils_getGlobalStyles__WEBPACK_IMPORTED_MODULE_0__[\"getGlobalStyles\"])() + \"\\n      </style>\\n      <meta name='viewport' content='initial-scale=1.0, width=device-width' />\\n      \" + styles + \"\\n    </head>\\n    <body>\\n      <div id=\\\"app\\\">\" + appHtml + \"</div>\\n      <script type=\\\"application/javascript\\\" src=\\\"index.js\\\"></script>\\n    </body>\\n  </html>\\n\";\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/Html.tsx?");

/***/ }),

/***/ "./src/client/components/Header/Header.tsx":
/*!*************************************************!*\
  !*** ./src/client/components/Header/Header.tsx ***!
  \*************************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return Header; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _HeaderCss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderCss */ \"./src/client/components/Header/HeaderCss.tsx\");\n/* harmony import */ var _images_logo_gif__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/logo.gif */ \"./src/client/images/logo.gif\");\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\n/* harmony import */ var _Image_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Image/Image */ \"./src/client/components/Image/Image.tsx\");\n\r\n\r\n\r\n\r\n\r\nvar Header = function (_a) {\r\n    var onMore = _a.onMore, onResetPosts = _a.onResetPosts;\r\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_HeaderCss__WEBPACK_IMPORTED_MODULE_1__[\"HeaderContainer\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_Image_Image__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { src: _images_logo_gif__WEBPACK_IMPORTED_MODULE_2__[\"default\"], alt: \"hackernews-logo\", style: { border: \"1px white solid\", marginLeft: '5px' } }),\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h1\", { className: \"post-title\" }, \"Hacker News\"),\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_shared__WEBPACK_IMPORTED_MODULE_3__[\"FlexContainer\"], { flexBasis: \"15%\" },\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_shared__WEBPACK_IMPORTED_MODULE_3__[\"PrimaryButton\"], { onClick: onMore }, \"More\"))));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/components/Header/Header.tsx?");

/***/ }),

/***/ "./src/client/components/Header/HeaderCss.tsx":
/*!****************************************************!*\
  !*** ./src/client/components/Header/HeaderCss.tsx ***!
  \****************************************************/
/*! exports provided: HeaderContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HeaderContainer\", function() { return HeaderContainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\n\r\nvar HeaderContainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.header(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  display: flex;\\n  max-width: 62.5rem;\\n  margin: auto;\\n  font-size: 0.8rem;\\n  align-items: center;\\n  background-color: \", \";\\n  padding:0.5em;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n\\n  .post-title{\\n        font-size: 0.8rem;\\n        padding:0;\\n        margin:0 0.7rem;\\n    }\\n\"], [\"\\n  display: flex;\\n  max-width: 62.5rem;\\n  margin: auto;\\n  font-size: 0.8rem;\\n  align-items: center;\\n  background-color: \", \";\\n  padding:0.5em;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n\\n  .post-title{\\n        font-size: 0.8rem;\\n        padding:0;\\n        margin:0 0.7rem;\\n    }\\n\"])), client_shared__WEBPACK_IMPORTED_MODULE_1__[\"PRIMARY_COLOR\"]);\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/components/Header/HeaderCss.tsx?");

/***/ }),

/***/ "./src/client/components/Image/Image.tsx":
/*!***********************************************!*\
  !*** ./src/client/components/Image/Image.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\r\nvar Image = function (_a) {\r\n    var src = _a.src, style = _a.style, alt = _a.alt, onClick = _a.onClick;\r\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"img\", { src: src, style: style, alt: alt, onClick: onClick });\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Image);\r\n\n\n//# sourceURL=webpack:///./src/client/components/Image/Image.tsx?");

/***/ }),

/***/ "./src/client/components/PostItem/PostItem.tsx":
/*!*****************************************************!*\
  !*** ./src/client/components/PostItem/PostItem.tsx ***!
  \*****************************************************/
/*! exports provided: PostItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PostItem\", function() { return PostItem; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_getDomainURL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/getDomainURL */ \"./src/client/utils/getDomainURL.ts\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\n/* harmony import */ var _PostItemCss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PostItemCss */ \"./src/client/components/PostItem/PostItemCss.tsx\");\n\r\n\r\n\r\n\r\n\r\nvar PostItem = function (_a) {\r\n    var postType = _a.postType, onHidePost = _a.onHidePost;\r\n    var title = postType.title, author = postType.author, domain = postType.url, created_at = postType.created_at, objectID = postType.objectID;\r\n    var domainURL = Object(_utils_getDomainURL__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(domain);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_PostItemCss__WEBPACK_IMPORTED_MODULE_4__[\"Postitemcontainer\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_shared__WEBPACK_IMPORTED_MODULE_3__[\"FlexContainer\"], null,\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h4\", { className: \"post-title item\" },\r\n                \" \",\r\n                title ? title : '')),\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_shared__WEBPACK_IMPORTED_MODULE_3__[\"FlexContainer\"], null,\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", { className: \"post-domain item\" }, domainURL && \"(\" + domainURL + \")\"),\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", { className: \"post-author item\" },\r\n                react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, \"by\"),\r\n                \" \",\r\n                react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"strong\", null, author)),\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", { className: \"post-date item\" }, \"on \" + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__[\"format\"])(new Date(created_at), 'dd-MMM-yyyy')),\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"button\", { className: \"post-hide item\", onClick: function () { return onHidePost(objectID); } },\r\n                react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, \"[\"),\r\n                \"hide\",\r\n                react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, \"]\")))));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/components/PostItem/PostItem.tsx?");

/***/ }),

/***/ "./src/client/components/PostItem/PostItemCss.tsx":
/*!********************************************************!*\
  !*** ./src/client/components/PostItem/PostItemCss.tsx ***!
  \********************************************************/
/*! exports provided: Postitemcontainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Postitemcontainer\", function() { return Postitemcontainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\n\r\nvar Postitemcontainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  display: flex;\\n  flex-direction: column;\\n\\n  .item {\\n    margin-left: 0.4rem;\\n    white-space: nowrap;\\n  }\\n\\n  .post-title {\\n    font-size: 0.7rem;\\n    margin-left: 0.5rem;\\n    background-color: none;\\n  }\\n  .post-username {\\n    span {\\n      color: gray;\\n    }\\n  }\\n  .post-domain {\\n    color: gray;\\n  }\\n\\n  .post-hide {\\n    font-size: 0.75rem;\\n    font-weight: 700;\\n    outline: none;\\n    background-color: transparent;\\n    cursor: pointer;\\n    padding: 0.2rem;\\n    border: none;\\n    span {\\n      color: gray;\\n      margin: 3px;\\n      font-weight: normal;\\n\\n      &:first-child {\\n        margin-left: 0;\\n      }\\n    }\\n  }\\n\\n  @media (min-width: \", \") {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n\"], [\"\\n  display: flex;\\n  flex-direction: column;\\n\\n  .item {\\n    margin-left: 0.4rem;\\n    white-space: nowrap;\\n  }\\n\\n  .post-title {\\n    font-size: 0.7rem;\\n    margin-left: 0.5rem;\\n    background-color: none;\\n  }\\n  .post-username {\\n    span {\\n      color: gray;\\n    }\\n  }\\n  .post-domain {\\n    color: gray;\\n  }\\n\\n  .post-hide {\\n    font-size: 0.75rem;\\n    font-weight: 700;\\n    outline: none;\\n    background-color: transparent;\\n    cursor: pointer;\\n    padding: 0.2rem;\\n    border: none;\\n    span {\\n      color: gray;\\n      margin: 3px;\\n      font-weight: normal;\\n\\n      &:first-child {\\n        margin-left: 0;\\n      }\\n    }\\n  }\\n\\n  @media (min-width: \", \") {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n\"])), client_shared__WEBPACK_IMPORTED_MODULE_1__[\"PHONE_BREAKPOINT\"]);\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/components/PostItem/PostItemCss.tsx?");

/***/ }),

/***/ "./src/client/components/Posts/Posts.tsx":
/*!***********************************************!*\
  !*** ./src/client/components/Posts/Posts.tsx ***!
  \***********************************************/
/*! exports provided: Posts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Posts\", function() { return Posts; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _PostItem_PostItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PostItem/PostItem */ \"./src/client/components/PostItem/PostItem.tsx\");\n/* harmony import */ var _Image_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image/Image */ \"./src/client/components/Image/Image.tsx\");\n/* harmony import */ var _PostsCss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostsCss */ \"./src/client/components/Posts/PostsCss.tsx\");\n/* harmony import */ var _images_grayarrow_gif__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/grayarrow.gif */ \"./src/client/images/grayarrow.gif\");\n\r\n\r\n\r\n\r\n\r\nvar Posts = function (_a) {\r\n    var postItems = _a.postItems, onUpvote = _a.onUpvote, onHidePost = _a.onHidePost;\r\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_PostsCss__WEBPACK_IMPORTED_MODULE_3__[\"PostsContainer\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"table\", null,\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"thead\", null),\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"tbody\", null, postItems\r\n                .map(function (postItem) {\r\n                var num_comments = postItem.num_comments, objectID = postItem.objectID, points = postItem.points;\r\n                return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"tr\", { key: objectID },\r\n                    react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"td\", null,\r\n                        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", { className: 'posts-comments' }, num_comments)),\r\n                    react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"td\", null,\r\n                        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", { className: 'posts-upvotes' },\r\n                            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, points),\r\n                            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_Image_Image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { src: _images_grayarrow_gif__WEBPACK_IMPORTED_MODULE_4__[\"default\"], alt: 'hackernews-logo', onClick: function () { return onUpvote(objectID); } }))),\r\n                    react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"td\", null,\r\n                        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_PostItem_PostItem__WEBPACK_IMPORTED_MODULE_1__[\"PostItem\"], { postType: postItem, onHidePost: onHidePost }))));\r\n            })))));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/components/Posts/Posts.tsx?");

/***/ }),

/***/ "./src/client/components/Posts/PostsCss.tsx":
/*!**************************************************!*\
  !*** ./src/client/components/Posts/PostsCss.tsx ***!
  \**************************************************/
/*! exports provided: PostsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PostsContainer\", function() { return PostsContainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\n\r\nvar PostsContainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  table {\\n    border-collapse: collapse;\\n    width: 100%;\\n  }\\n  td,\\n  th {\\n    text-align: center;\\n    padding: 0.4rem 0.5rem;\\n  }\\n\\n  tr:nth-child(even) {\\n    background-color: \", \";\\n  }\\n\\n  .posts-upvotes {\\n    display: flex;\\n    width: 1.2rem;\\n    align-items: center;\\n\\n    img {\\n      margin: 2px;\\n      margin-top: -2px;\\n      cursor: pointer;\\n    }\\n  }\\n\\n  @media (min-width:\", \") {\\n    .posts-upvotes {\\n        display: flex;\\n        width: 1rem;\\n        align-items: center;\\n\\n        img {\\n          margin: 3px;\\n          margin-top: -2px;\\n          cursor: pointer;\\n        }\\n      }\\n  }\\n\"], [\"\\n  table {\\n    border-collapse: collapse;\\n    width: 100%;\\n  }\\n  td,\\n  th {\\n    text-align: center;\\n    padding: 0.4rem 0.5rem;\\n  }\\n\\n  tr:nth-child(even) {\\n    background-color: \", \";\\n  }\\n\\n  .posts-upvotes {\\n    display: flex;\\n    width: 1.2rem;\\n    align-items: center;\\n\\n    img {\\n      margin: 2px;\\n      margin-top: -2px;\\n      cursor: pointer;\\n    }\\n  }\\n\\n  @media (min-width:\", \") {\\n    .posts-upvotes {\\n        display: flex;\\n        width: 1rem;\\n        align-items: center;\\n\\n        img {\\n          margin: 3px;\\n          margin-top: -2px;\\n          cursor: pointer;\\n        }\\n      }\\n  }\\n\"])), client_shared__WEBPACK_IMPORTED_MODULE_1__[\"GRAY_COLOR_DARK\"], client_shared__WEBPACK_IMPORTED_MODULE_1__[\"PHONE_BREAKPOINT\"]);\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/components/Posts/PostsCss.tsx?");

/***/ }),

/***/ "./src/client/components/index.ts":
/*!****************************************!*\
  !*** ./src/client/components/index.ts ***!
  \****************************************/
/*! exports provided: Header, Posts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header/Header */ \"./src/client/components/Header/Header.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return _Header_Header__WEBPACK_IMPORTED_MODULE_0__[\"Header\"]; });\n\n/* harmony import */ var _Posts_Posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Posts/Posts */ \"./src/client/components/Posts/Posts.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Posts\", function() { return _Posts_Posts__WEBPACK_IMPORTED_MODULE_1__[\"Posts\"]; });\n\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/client/components/index.ts?");

/***/ }),

/***/ "./src/client/images/grayarrow.gif":
/*!*****************************************!*\
  !*** ./src/client/images/grayarrow.gif ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"61f238390ab75b0e15cb32152190d15e.gif\");\n\n//# sourceURL=webpack:///./src/client/images/grayarrow.gif?");

/***/ }),

/***/ "./src/client/images/logo.gif":
/*!************************************!*\
  !*** ./src/client/images/logo.gif ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"345832632e11938a05257da524e0c5d3.gif\");\n\n//# sourceURL=webpack:///./src/client/images/logo.gif?");

/***/ }),

/***/ "./src/client/pages/Home/Home.tsx":
/*!****************************************!*\
  !*** ./src/client/pages/Home/Home.tsx ***!
  \****************************************/
/*! exports provided: Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Home\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! query-string */ \"query-string\");\n/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Header_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Header/Header */ \"./src/client/components/Header/Header.tsx\");\n/* harmony import */ var client_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! client/components */ \"./src/client/components/index.ts\");\n/* harmony import */ var _HomeCss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HomeCss */ \"./src/client/pages/Home/HomeCss.tsx\");\n/* harmony import */ var client_utils_getLocalStorageMap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! client/utils/getLocalStorageMap */ \"./src/client/utils/getLocalStorageMap.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __spreadArrays = (undefined && undefined.__spreadArrays) || function () {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n};\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar Home = function () {\r\n    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"useHistory\"])();\r\n    var location = history.location;\r\n    var page = query_string__WEBPACK_IMPORTED_MODULE_2__[\"parse\"](location.search).page;\r\n    var pageNum = page != null && !isNaN(Number(page)) ? Number(page) : 0;\r\n    var _a = react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"](pageNum), pageNumber = _a[0], setPageNumber = _a[1];\r\n    var _b = react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"]([]), posts = _b[0], setPosts = _b[1];\r\n    var onMore = function () {\r\n        history.push(\"/?page=\" + (pageNumber + 1));\r\n        setPageNumber(pageNumber + 1);\r\n    };\r\n    var onUpvote = function (postId) {\r\n        console.log(\"on upvote\", postId);\r\n        var post = posts.find(function (post) { return post.objectID === postId; });\r\n        if (post != null) {\r\n            post.points = post.points + 1;\r\n            var pagePostsStorage = Object(client_utils_getLocalStorageMap__WEBPACK_IMPORTED_MODULE_6__[\"getLocalStorageMap\"])();\r\n            pagePostsStorage.set(pageNumber, posts);\r\n            localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));\r\n            setPosts(__spreadArrays(posts));\r\n        }\r\n    };\r\n    var onHidePost = function (postId) {\r\n        console.log(\"on hidePost\", postId);\r\n        var postsFiltered = posts.filter(function (post) { return post.objectID !== postId; });\r\n        var pagePostsStorage = Object(client_utils_getLocalStorageMap__WEBPACK_IMPORTED_MODULE_6__[\"getLocalStorageMap\"])();\r\n        pagePostsStorage.set(pageNumber, postsFiltered);\r\n        localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));\r\n        setPosts(__spreadArrays(postsFiltered));\r\n    };\r\n    var onResetPosts = function () {\r\n        localStorage.removeItem(\"pagePostsMap\");\r\n        history.push(\"/?page=\" + pageNumber);\r\n    };\r\n    react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"](function () {\r\n        var unlisten = history.listen(function (location, _action) {\r\n            console.log('route changed');\r\n            var page = query_string__WEBPACK_IMPORTED_MODULE_2__[\"parse\"](location.search).page;\r\n            var pageNum = page != null && !isNaN(Number(page)) ? Number(page) : 0;\r\n            setPageNumber(pageNum);\r\n        });\r\n        return unlisten;\r\n    }, []);\r\n    react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"](function () {\r\n        console.log('fetching posts...');\r\n        var fetchPosts = function (pageNumber) { return __awaiter(void 0, void 0, void 0, function () {\r\n            var response, posts;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4, fetch(\"https://hn.algolia.com/api/v1/search?page=\" + pageNumber + \"&hitsPerPage=30\")];\r\n                    case 1:\r\n                        response = _a.sent();\r\n                        return [4, response.json()];\r\n                    case 2:\r\n                        posts = (_a.sent()).hits;\r\n                        setPosts(__spreadArrays(posts));\r\n                        return [2];\r\n                }\r\n            });\r\n        }); };\r\n        var pagePostMapFromLocalStorage = Object(client_utils_getLocalStorageMap__WEBPACK_IMPORTED_MODULE_6__[\"getLocalStorageMap\"])();\r\n        var currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);\r\n        currentPagePosts != null ? setPosts(__spreadArrays(currentPagePosts)) : fetchPosts(pageNumber);\r\n    }, [pageNumber]);\r\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_HomeCss__WEBPACK_IMPORTED_MODULE_5__[\"HomeContainer\"], null,\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_components_Header_Header__WEBPACK_IMPORTED_MODULE_3__[\"Header\"], { onMore: onMore, onResetPosts: onResetPosts }),\r\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_components__WEBPACK_IMPORTED_MODULE_4__[\"Posts\"], { postItems: posts, onUpvote: onUpvote, onHidePost: onHidePost })));\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/pages/Home/Home.tsx?");

/***/ }),

/***/ "./src/client/pages/Home/HomeCss.tsx":
/*!*******************************************!*\
  !*** ./src/client/pages/Home/HomeCss.tsx ***!
  \*******************************************/
/*! exports provided: HomeContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HomeContainer\", function() { return HomeContainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var client_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! client/shared */ \"./src/client/shared/index.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\n\r\nvar HomeContainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  max-width: 62.5rem;\\n  width: 95%;\\n  font-size: 0.6rem;\\n  margin: 0 auto;\\n  margin-top: 2rem;\\n  align-items: center;\\n  background: \", \";\\n  overflow: auto;\\n  height: 95vh;\\n  position: relative;\\n\\n  @media (min-width: \", \") {\\n    font-size: 0.72rem;\\n  }\\n\"], [\"\\n  max-width: 62.5rem;\\n  width: 95%;\\n  font-size: 0.6rem;\\n  margin: 0 auto;\\n  margin-top: 2rem;\\n  align-items: center;\\n  background: \", \";\\n  overflow: auto;\\n  height: 95vh;\\n  position: relative;\\n\\n  @media (min-width: \", \") {\\n    font-size: 0.72rem;\\n  }\\n\"])), client_shared__WEBPACK_IMPORTED_MODULE_1__[\"GRAY_COLOR\"], client_shared__WEBPACK_IMPORTED_MODULE_1__[\"TABLET_BREAKPOINT\"]);\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/pages/Home/HomeCss.tsx?");

/***/ }),

/***/ "./src/client/shared/Styledcomponents/CssVariables.ts":
/*!************************************************************!*\
  !*** ./src/client/shared/Styledcomponents/CssVariables.ts ***!
  \************************************************************/
/*! exports provided: APP_COLOR, BLACK_COLOR_LIGHT, GRAY_COLOR, GRAY_COLOR_DARK, PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, PHONE_BREAKPOINT, TABLET_BREAKPOINT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP_COLOR\", function() { return APP_COLOR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BLACK_COLOR_LIGHT\", function() { return BLACK_COLOR_LIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRAY_COLOR\", function() { return GRAY_COLOR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRAY_COLOR_DARK\", function() { return GRAY_COLOR_DARK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PRIMARY_COLOR\", function() { return PRIMARY_COLOR; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PRIMARY_COLOR_LIGHT\", function() { return PRIMARY_COLOR_LIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PHONE_BREAKPOINT\", function() { return PHONE_BREAKPOINT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TABLET_BREAKPOINT\", function() { return TABLET_BREAKPOINT; });\nvar APP_COLOR = 'rgb(255,102,0)';\r\nvar BLACK_COLOR_LIGHT = 'rgba(0,0,0,0.8)';\r\nvar GRAY_COLOR = '#f7f7f7';\r\nvar GRAY_COLOR_DARK = '#dddddd';\r\nvar PRIMARY_COLOR = '#e65c00';\r\nvar PRIMARY_COLOR_LIGHT = '#ffa366';\r\nvar PHONE_BREAKPOINT = '500px';\r\nvar TABLET_BREAKPOINT = '900px';\r\n\n\n//# sourceURL=webpack:///./src/client/shared/Styledcomponents/CssVariables.ts?");

/***/ }),

/***/ "./src/client/shared/Styledcomponents/FlexContainer.tsx":
/*!**************************************************************!*\
  !*** ./src/client/shared/Styledcomponents/FlexContainer.tsx ***!
  \**************************************************************/
/*! exports provided: FlexContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FlexContainer\", function() { return FlexContainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\nvar FlexContainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n        display: flex;\\n        align-items: center;\\n        justify-content:\", \";\\n        flex-basis:\", \";\\n\"], [\"\\n        display: flex;\\n        align-items: center;\\n        justify-content:\", \";\\n        flex-basis:\", \";\\n\"])), function (_a) {\r\n    var spacing = _a.spacing;\r\n    return spacing;\r\n}, function (_a) {\r\n    var flexBasis = _a.flexBasis;\r\n    return flexBasis;\r\n});\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/shared/Styledcomponents/FlexContainer.tsx?");

/***/ }),

/***/ "./src/client/shared/Styledcomponents/PrimaryButton.tsx":
/*!**************************************************************!*\
  !*** ./src/client/shared/Styledcomponents/PrimaryButton.tsx ***!
  \**************************************************************/
/*! exports provided: PrimaryButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PrimaryButton\", function() { return PrimaryButton; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CssVariables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CssVariables */ \"./src/client/shared/Styledcomponents/CssVariables.ts\");\nvar __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\n\r\nvar PrimaryButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([\"\\n  text-decoration: none;\\n  font-size:0.8rem;\\n  background-color: \", \";\\n  cursor: pointer;\\n  color: \", \";\\n  outline: none;\\n  border: 1px solid \", \";\\n  padding: 0.2rem 1rem;\\n  &:hover {\\n    background-color: \", \";\\n  }\\n  &:active {\\n    background-color: \", \";\\n  }\\n\"], [\"\\n  text-decoration: none;\\n  font-size:0.8rem;\\n  background-color: \", \";\\n  cursor: pointer;\\n  color: \", \";\\n  outline: none;\\n  border: 1px solid \", \";\\n  padding: 0.2rem 1rem;\\n  &:hover {\\n    background-color: \", \";\\n  }\\n  &:active {\\n    background-color: \", \";\\n  }\\n\"])), _CssVariables__WEBPACK_IMPORTED_MODULE_1__[\"PRIMARY_COLOR\"], _CssVariables__WEBPACK_IMPORTED_MODULE_1__[\"BLACK_COLOR_LIGHT\"], _CssVariables__WEBPACK_IMPORTED_MODULE_1__[\"BLACK_COLOR_LIGHT\"], _CssVariables__WEBPACK_IMPORTED_MODULE_1__[\"PRIMARY_COLOR_LIGHT\"], _CssVariables__WEBPACK_IMPORTED_MODULE_1__[\"PRIMARY_COLOR_LIGHT\"]);\r\nvar templateObject_1;\r\n\n\n//# sourceURL=webpack:///./src/client/shared/Styledcomponents/PrimaryButton.tsx?");

/***/ }),

/***/ "./src/client/shared/index.ts":
/*!************************************!*\
  !*** ./src/client/shared/index.ts ***!
  \************************************/
/*! exports provided: FlexContainer, PrimaryButton, APP_COLOR, BLACK_COLOR_LIGHT, GRAY_COLOR, GRAY_COLOR_DARK, PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, PHONE_BREAKPOINT, TABLET_BREAKPOINT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Styledcomponents_FlexContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Styledcomponents/FlexContainer */ \"./src/client/shared/Styledcomponents/FlexContainer.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FlexContainer\", function() { return _Styledcomponents_FlexContainer__WEBPACK_IMPORTED_MODULE_0__[\"FlexContainer\"]; });\n\n/* harmony import */ var _Styledcomponents_PrimaryButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styledcomponents/PrimaryButton */ \"./src/client/shared/Styledcomponents/PrimaryButton.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PrimaryButton\", function() { return _Styledcomponents_PrimaryButton__WEBPACK_IMPORTED_MODULE_1__[\"PrimaryButton\"]; });\n\n/* harmony import */ var _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Styledcomponents/CssVariables */ \"./src/client/shared/Styledcomponents/CssVariables.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"APP_COLOR\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"APP_COLOR\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BLACK_COLOR_LIGHT\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"BLACK_COLOR_LIGHT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GRAY_COLOR\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"GRAY_COLOR\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GRAY_COLOR_DARK\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"GRAY_COLOR_DARK\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PRIMARY_COLOR\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"PRIMARY_COLOR\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PRIMARY_COLOR_LIGHT\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"PRIMARY_COLOR_LIGHT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PHONE_BREAKPOINT\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"PHONE_BREAKPOINT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TABLET_BREAKPOINT\", function() { return _Styledcomponents_CssVariables__WEBPACK_IMPORTED_MODULE_2__[\"TABLET_BREAKPOINT\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/client/shared/index.ts?");

/***/ }),

/***/ "./src/client/utils/getDomainURL.ts":
/*!******************************************!*\
  !*** ./src/client/utils/getDomainURL.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (URL) {\r\n    return URL ? URL.replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0]\r\n        : \"\";\r\n});\r\n\n\n//# sourceURL=webpack:///./src/client/utils/getDomainURL.ts?");

/***/ }),

/***/ "./src/client/utils/getGlobalStyles.ts":
/*!*********************************************!*\
  !*** ./src/client/utils/getGlobalStyles.ts ***!
  \*********************************************/
/*! exports provided: getGlobalStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getGlobalStyles\", function() { return getGlobalStyles; });\nvar getGlobalStyles = function () { return \"\\n*,\\n::after,\\n::before {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box;\\n}\\n\\nbody {\\n  margin: 0;\\n  font-family: sans-serif, Georgia, \\\"Times New Roman\\\", Times, serif;\\n  padding: 0;\\n}\\n\"; };\r\n\n\n//# sourceURL=webpack:///./src/client/utils/getGlobalStyles.ts?");

/***/ }),

/***/ "./src/client/utils/getLocalStorageMap.ts":
/*!************************************************!*\
  !*** ./src/client/utils/getLocalStorageMap.ts ***!
  \************************************************/
/*! exports provided: getLocalStorageMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLocalStorageMap\", function() { return getLocalStorageMap; });\nvar getLocalStorageMap = function () {\r\n    if (localStorage.getItem(\"pagePostsMap\")) {\r\n        console.log(\"data exists in local storage\");\r\n        return new Map(JSON.parse(localStorage.pagePostsMap));\r\n    }\r\n    else {\r\n        console.log(\"data does not exist local storage\");\r\n        return new Map();\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/client/utils/getLocalStorageMap.ts?");

/***/ }),

/***/ "./src/server/index.tsx":
/*!******************************!*\
  !*** ./src/server/index.tsx ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var client_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! client/App */ \"./src/client/App.tsx\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var client_Html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! client/Html */ \"./src/client/Html.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction main() {\r\n    var express = express__WEBPACK_IMPORTED_MODULE_2__();\r\n    var port = 8080;\r\n    express.use(express__WEBPACK_IMPORTED_MODULE_2__[\"static\"](\"build\"));\r\n    express.get(\"/*\", function (req, res, next) {\r\n        var sheet = new styled_components__WEBPACK_IMPORTED_MODULE_4__[\"ServerStyleSheet\"]();\r\n        var appHtml = react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"](sheet.collectStyles(react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"StaticRouter\"], { location: req.path, context: {} },\r\n            react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](client_App__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null))));\r\n        var styles = sheet.getStyleTags();\r\n        var title = 'Server side Rendering';\r\n        res.send(Object(client_Html__WEBPACK_IMPORTED_MODULE_5__[\"Html\"])({\r\n            appHtml: appHtml,\r\n            styles: styles,\r\n            title: title\r\n        }));\r\n        res.end();\r\n        next();\r\n    });\r\n    var server = express.listen(port);\r\n    if (true) {\r\n        module.hot.accept();\r\n        module.hot.dispose(function () { return server.close(); });\r\n    }\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack:///./src/server/index.tsx?");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"date-fns\");\n\n//# sourceURL=webpack:///external_%22date-fns%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"query-string\");\n\n//# sourceURL=webpack:///external_%22query-string%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");\n\n//# sourceURL=webpack:///external_%22styled-components%22?");

/***/ })

/******/ });