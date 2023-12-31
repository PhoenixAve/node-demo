!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t(require("vue")))
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.VueJsonPretty = t(require("vue")))
    : (e.VueJsonPretty = t(e.Vue));
})(this, function (e) {
  return (function () {
    "use strict";
    var t = {
        789: function (t) {
          t.exports = e;
        },
      },
      n = {};
    function o(e) {
      var r = n[e];
      if (void 0 !== r) return r.exports;
      var l = (n[e] = { exports: {} });
      return t[e](l, l.exports, o), l.exports;
    }
    (o.d = function (e, t) {
      for (var n in t)
        o.o(t, n) &&
          !o.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var r = {};
    return (
      (function () {
        function e(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
          return o;
        }
        function t(t, n) {
          if (t) {
            if ("string" == typeof t) return e(t, n);
            var o = Object.prototype.toString.call(t).slice(8, -1);
            return (
              "Object" === o && t.constructor && (o = t.constructor.name),
              "Map" === o || "Set" === o
                ? Array.from(t)
                : "Arguments" === o ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                ? e(t, n)
                : void 0
            );
          }
        }
        function n(n) {
          return (
            (function (t) {
              if (Array.isArray(t)) return e(t);
            })(n) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(n) ||
            t(n) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function l(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }
        o.r(r),
          o.d(r, {
            default: function () {
              return k;
            },
          });
        var a = o(789),
          i = (0, a.defineComponent)({
            props: { data: { required: !0, type: String }, onClick: Function },
            render: function () {
              var e = this.data,
                t = this.onClick;
              return (0, a.createVNode)(
                "span",
                { class: "vjs-tree-brackets", onClick: t },
                [e]
              );
            },
          }),
          c = (0, a.defineComponent)({
            emits: ["change", "update:modelValue"],
            props: {
              checked: { type: Boolean, default: !1 },
              isMultiple: Boolean,
              onChange: Function,
            },
            setup: function (e, t) {
              var n = t.emit;
              return {
                uiType: (0, a.computed)(function () {
                  return e.isMultiple ? "checkbox" : "radio";
                }),
                model: (0, a.computed)({
                  get: function () {
                    return e.checked;
                  },
                  set: function (e) {
                    return n("update:modelValue", e);
                  },
                }),
              };
            },
            render: function () {
              var e = this.uiType,
                t = this.model,
                n = this.$emit;
              return (0, a.createVNode)(
                "label",
                {
                  class: ["vjs-check-controller", t ? "is-checked" : ""],
                  onClick: function (e) {
                    return e.stopPropagation();
                  },
                },
                [
                  (0, a.createVNode)(
                    "span",
                    { class: "vjs-check-controller-inner is-".concat(e) },
                    null
                  ),
                  (0, a.createVNode)(
                    "input",
                    {
                      checked: t,
                      class: "vjs-check-controller-original is-".concat(e),
                      type: e,
                      onChange: function () {
                        return n("change", t);
                      },
                    },
                    null
                  ),
                ]
              );
            },
          }),
          u = (0, a.defineComponent)({
            props: {
              nodeType: { required: !0, type: String },
              onClick: Function,
            },
            render: function () {
              var e = this.nodeType,
                t = this.onClick,
                n = "objectStart" === e || "arrayStart" === e;
              return n || "objectCollapsed" === e || "arrayCollapsed" === e
                ? (0, a.createVNode)(
                    "span",
                    {
                      class: "vjs-carets vjs-carets-".concat(
                        n ? "open" : "close"
                      ),
                      onClick: t,
                    },
                    [
                      (0, a.createVNode)(
                        "svg",
                        {
                          viewBox: "0 0 1024 1024",
                          focusable: "false",
                          "data-icon": "caret-down",
                          width: "1em",
                          height: "1em",
                          fill: "currentColor",
                          "aria-hidden": "true",
                        },
                        [
                          (0, a.createVNode)(
                            "path",
                            {
                              d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z",
                            },
                            null
                          ),
                        ]
                      ),
                    ]
                  )
                : null;
            },
          });
        function d(e) {
          return (
            (d =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            d(e)
          );
        }
        function s(e) {
          return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
        }
        function p(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "root",
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 0,
            o = arguments.length > 3 ? arguments[3] : void 0,
            r = o || {},
            l = r.key,
            a = r.index,
            i = r.type,
            c = void 0 === i ? "content" : i,
            u = r.showComma,
            d = void 0 !== u && u,
            h = r.length,
            y = void 0 === h ? 1 : h,
            v = s(e);
          if ("array" === v) {
            var b = f(
              e.map(function (e, o, r) {
                return p(e, "".concat(t, "[").concat(o, "]"), n + 1, {
                  index: o,
                  showComma: o !== r.length - 1,
                  length: y,
                  type: c,
                });
              })
            );
            return [
              p("[", t, n, {
                showComma: !1,
                key: l,
                length: e.length,
                type: "arrayStart",
              })[0],
            ].concat(
              b,
              p("]", t, n, {
                showComma: d,
                length: e.length,
                type: "arrayEnd",
              })[0]
            );
          }
          if ("object" === v) {
            var g = Object.keys(e),
              m = f(
                g.map(function (o, r, l) {
                  return p(
                    e[o],
                    /^[a-zA-Z_]\w*$/.test(o)
                      ? "".concat(t, ".").concat(o)
                      : "".concat(t, '["').concat(o, '"]'),
                    n + 1,
                    {
                      key: o,
                      showComma: r !== l.length - 1,
                      length: y,
                      type: c,
                    }
                  );
                })
              );
            return [
              p("{", t, n, {
                showComma: !1,
                key: l,
                index: a,
                length: g.length,
                type: "objectStart",
              })[0],
            ].concat(
              m,
              p("}", t, n, {
                showComma: d,
                length: g.length,
                type: "objectEnd",
              })[0]
            );
          }
          return [
            {
              content: e,
              level: n,
              key: l,
              index: a,
              path: t,
              showComma: d,
              length: y,
              type: c,
            },
          ];
        }
        function f(e) {
          if ("function" == typeof Array.prototype.flat) return e.flat();
          for (var t = n(e), o = []; t.length; ) {
            var r = t.shift();
            Array.isArray(r) ? t.unshift.apply(t, n(r)) : o.push(r);
          }
          return o;
        }
        function h(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : new WeakMap();
          if (null == e) return e;
          if (e instanceof Date) return new Date(e);
          if (e instanceof RegExp) return new RegExp(e);
          if ("object" !== d(e)) return e;
          if (t.get(e)) return t.get(e);
          if (Array.isArray(e)) {
            var n = e.map(function (e) {
              return h(e, t);
            });
            return t.set(e, n), n;
          }
          var o = {};
          for (var r in e) o[r] = h(e[r], t);
          return t.set(e, o), o;
        }
        function y(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t &&
              (o = o.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function v(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? y(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : y(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var b = {
            showLength: { type: Boolean, default: !1 },
            showDoubleQuotes: { type: Boolean, default: !0 },
            renderNodeKey: Function,
            renderNodeValue: Function,
            selectableType: String,
            showSelectController: { type: Boolean, default: !1 },
            showLine: { type: Boolean, default: !0 },
            showLineNumber: { type: Boolean, default: !1 },
            selectOnClickNode: { type: Boolean, default: !0 },
            nodeSelectable: {
              type: Function,
              default: function () {
                return !0;
              },
            },
            highlightSelectedNode: { type: Boolean, default: !0 },
            showIcon: { type: Boolean, default: !1 },
            editable: { type: Boolean, default: !1 },
            editableTrigger: { type: String, default: "click" },
            onNodeClick: { type: Function },
            onBracketsClick: { type: Function },
            onIconClick: { type: Function },
            onValueChange: { type: Function },
          },
          g = (0, a.defineComponent)({
            name: "TreeNode",
            props: v(
              v({}, b),
              {},
              {
                node: { type: Object, required: !0 },
                collapsed: Boolean,
                checked: Boolean,
                style: Object,
                onSelectedChange: { type: Function },
              }
            ),
            emits: [
              "nodeClick",
              "bracketsClick",
              "iconClick",
              "selectedChange",
              "valueChange",
            ],
            setup: function (e, t) {
              var n = t.emit,
                o = (0, a.computed)(function () {
                  return s(e.node.content);
                }),
                r = (0, a.computed)(function () {
                  return "vjs-value vjs-value-".concat(o.value);
                }),
                l = (0, a.computed)(function () {
                  return e.showDoubleQuotes
                    ? '"'.concat(e.node.key, '"')
                    : e.node.key;
                }),
                d = (0, a.computed)(function () {
                  return "multiple" === e.selectableType;
                }),
                p = (0, a.computed)(function () {
                  return "single" === e.selectableType;
                }),
                f = (0, a.computed)(function () {
                  return e.nodeSelectable(e.node) && (d.value || p.value);
                }),
                h = (0, a.reactive)({ editing: !1 }),
                y = function (t) {
                  var o,
                    r,
                    l =
                      "null" ===
                      (r =
                        null === (o = t.target) || void 0 === o
                          ? void 0
                          : o.value)
                        ? null
                        : "undefined" === r
                        ? void 0
                        : "true" === r ||
                          ("false" !== r &&
                            (r[0] + r[r.length - 1] === '""' ||
                            r[0] + r[r.length - 1] === "''"
                              ? r.slice(1, -1)
                              : ("number" == typeof Number(r) &&
                                  !isNaN(Number(r))) ||
                                "NaN" === r
                              ? Number(r)
                              : r));
                  n("valueChange", l, e.node.path);
                },
                v = (0, a.computed)(function () {
                  var t,
                    n =
                      null === (t = e.node) || void 0 === t
                        ? void 0
                        : t.content;
                  return (
                    null === n
                      ? (n = "null")
                      : void 0 === n && (n = "undefined"),
                    "string" === o.value ? '"'.concat(n, '"') : n + ""
                  );
                }),
                b = function () {
                  var t = e.renderNodeValue;
                  return t
                    ? t({ node: e.node, defaultValue: v.value })
                    : v.value;
                },
                g = function () {
                  n("bracketsClick", !e.collapsed, e.node.path);
                },
                m = function () {
                  n("iconClick", !e.collapsed, e.node.path);
                },
                C = function () {
                  n("selectedChange", e.node);
                },
                k = function () {
                  n("nodeClick", e.node),
                    f.value &&
                      e.selectOnClickNode &&
                      n("selectedChange", e.node);
                },
                w = function (t) {
                  if (e.editable && !h.editing) {
                    h.editing = !0;
                    var n = function e(n) {
                      var o;
                      n.target !== t.target &&
                        (null === (o = n.target) || void 0 === o
                          ? void 0
                          : o.parentElement) !== t.target &&
                        ((h.editing = !1),
                        document.removeEventListener("click", e));
                    };
                    document.removeEventListener("click", n),
                      document.addEventListener("click", n);
                  }
                };
              return function () {
                var t,
                  n = e.node;
                return (0, a.createVNode)(
                  "div",
                  {
                    class: {
                      "vjs-tree-node": !0,
                      "has-selector": e.showSelectController,
                      "has-carets": e.showIcon,
                      "is-highlight": e.highlightSelectedNode && e.checked,
                    },
                    onClick: k,
                    style: e.style,
                  },
                  [
                    e.showLineNumber &&
                      (0, a.createVNode)("span", { class: "vjs-node-index" }, [
                        n.id + 1,
                      ]),
                    e.showSelectController &&
                      f.value &&
                      "objectEnd" !== n.type &&
                      "arrayEnd" !== n.type &&
                      (0, a.createVNode)(
                        c,
                        {
                          isMultiple: d.value,
                          checked: e.checked,
                          onChange: C,
                        },
                        null
                      ),
                    (0, a.createVNode)("div", { class: "vjs-indent" }, [
                      Array.from(Array(n.level)).map(function (t, n) {
                        return (0,
                        a.createVNode)("div", { key: n, class: { "vjs-indent-unit": !0, "has-line": e.showLine } }, null);
                      }),
                      e.showIcon &&
                        (0, a.createVNode)(
                          u,
                          { nodeType: n.type, onClick: m },
                          null
                        ),
                    ]),
                    n.key &&
                      (0, a.createVNode)("span", { class: "vjs-key" }, [
                        ((t = e.renderNodeKey),
                        t
                          ? t({ node: e.node, defaultKey: l.value || "" })
                          : l.value),
                        (0, a.createVNode)("span", null, [
                          (0, a.createTextVNode)(":"),
                        ]),
                      ]),
                    (0, a.createVNode)("span", null, [
                      "content" !== n.type && n.content
                        ? (0, a.createVNode)(
                            i,
                            { data: n.content.toString(), onClick: g },
                            null
                          )
                        : (0, a.createVNode)(
                            "span",
                            {
                              class: r.value,
                              onClick:
                                !e.editable ||
                                (e.editableTrigger &&
                                  "click" !== e.editableTrigger)
                                  ? void 0
                                  : w,
                              onDblclick:
                                e.editable && "dblclick" === e.editableTrigger
                                  ? w
                                  : void 0,
                            },
                            [
                              e.editable && h.editing
                                ? (0, a.createVNode)(
                                    "input",
                                    {
                                      value: v.value,
                                      onChange: y,
                                      style: {
                                        padding: "3px 8px",
                                        border: "1px solid #eee",
                                        boxShadow: "none",
                                        boxSizing: "border-box",
                                        borderRadius: 5,
                                        fontFamily: "inherit",
                                      },
                                    },
                                    null
                                  )
                                : b(),
                            ]
                          ),
                      n.showComma && (0, a.createVNode)("span", null, [","]),
                      e.showLength &&
                        e.collapsed &&
                        (0, a.createVNode)("span", { class: "vjs-comment" }, [
                          (0, a.createTextVNode)(" // "),
                          n.length,
                          (0, a.createTextVNode)(" items "),
                        ]),
                    ]),
                  ]
                );
              };
            },
          });
        function m(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            t &&
              (o = o.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function C(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? m(Object(n), !0).forEach(function (t) {
                  l(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : m(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        }
        var k = (0, a.defineComponent)({
          name: "Tree",
          props: C(
            C({}, b),
            {},
            {
              data: { type: Object, default: null },
              deep: { type: Number, default: 1 / 0 },
              pathCollapsible: {
                type: Function,
                default: function () {
                  return !1;
                },
              },
              rootPath: { type: String, default: "root" },
              virtual: { type: Boolean, default: !1 },
              height: { type: Number, default: 400 },
              itemHeight: { type: Number, default: 20 },
              selectedValue: {
                type: [String, Array],
                default: function () {
                  return "";
                },
              },
              collapsedOnClickBrackets: { type: Boolean, default: !0 },
              style: Object,
              onSelectedChange: { type: Function },
            }
          ),
          slots: ["renderNodeKey", "renderNodeValue"],
          emits: [
            "nodeClick",
            "bracketsClick",
            "iconClick",
            "selectedChange",
            "update:selectedValue",
            "update:data",
          ],
          setup: function (e, o) {
            var r = o.emit,
              i = o.slots,
              c = (0, a.ref)(),
              u = (0, a.computed)(function () {
                return p(e.data, e.rootPath);
              }),
              d = (0, a.reactive)({
                translateY: 0,
                visibleData: null,
                hiddenPaths: u.value.reduce(function (t, n) {
                  var o,
                    r = n.level >= e.deep,
                    a =
                      null === (o = e.pathCollapsible) || void 0 === o
                        ? void 0
                        : o.call(e, n);
                  return ("objectStart" !== n.type &&
                    "arrayStart" !== n.type) ||
                    (!r && !a)
                    ? t
                    : C(C({}, t), {}, l({}, n.path, 1));
                }, {}),
              }),
              s = (0, a.computed)(function () {
                for (
                  var e = null, t = [], n = u.value.length, o = 0;
                  o < n;
                  o++
                ) {
                  var r = C(C({}, u.value[o]), {}, { id: o }),
                    l = d.hiddenPaths[r.path];
                  if (e && e.path === r.path) {
                    var a = "objectStart" === e.type,
                      i = C(
                        C(C({}, r), e),
                        {},
                        {
                          showComma: r.showComma,
                          content: a ? "{...}" : "[...]",
                          type: a ? "objectCollapsed" : "arrayCollapsed",
                        }
                      );
                    (e = null), t.push(i);
                  } else {
                    if (l && !e) {
                      e = r;
                      continue;
                    }
                    if (e) continue;
                    t.push(r);
                  }
                }
                return t;
              }),
              f = (0, a.computed)(function () {
                var t = e.selectedValue;
                return t && "multiple" === e.selectableType && Array.isArray(t)
                  ? t
                  : [t];
              }),
              y = (0, a.computed)(function () {
                return !e.selectableType ||
                  e.selectOnClickNode ||
                  e.showSelectController
                  ? ""
                  : "When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail.";
              }),
              v = function () {
                var t = s.value;
                if (e.virtual) {
                  var n,
                    o = e.height / e.itemHeight,
                    r =
                      (null === (n = c.value) || void 0 === n
                        ? void 0
                        : n.scrollTop) || 0,
                    l = Math.floor(r / e.itemHeight),
                    a = l < 0 ? 0 : l + o > t.length ? t.length - o : l;
                  a < 0 && (a = 0);
                  var i = a + o;
                  (d.translateY = a * e.itemHeight),
                    (d.visibleData = t.filter(function (e, t) {
                      return t >= a && t < i;
                    }));
                } else d.visibleData = t;
              },
              b = function () {
                v();
              },
              m = function (o) {
                var l,
                  a,
                  i = o.path,
                  c = e.selectableType;
                if ("multiple" === c) {
                  var u = f.value.findIndex(function (e) {
                      return e === i;
                    }),
                    d = n(f.value);
                  -1 !== u ? d.splice(u, 1) : d.push(i),
                    r("update:selectedValue", d),
                    r("selectedChange", d, n(f.value));
                } else if ("single" === c && f.value[0] !== i) {
                  var s = ((l = f.value),
                    (a = 1),
                    (function (e) {
                      if (Array.isArray(e)) return e;
                    })(l) ||
                      (function (e, t) {
                        var n =
                          null == e
                            ? null
                            : ("undefined" != typeof Symbol &&
                                e[Symbol.iterator]) ||
                              e["@@iterator"];
                        if (null != n) {
                          var o,
                            r,
                            l = [],
                            a = !0,
                            i = !1;
                          try {
                            for (
                              n = n.call(e);
                              !(a = (o = n.next()).done) &&
                              (l.push(o.value), !t || l.length !== t);
                              a = !0
                            );
                          } catch (e) {
                            (i = !0), (r = e);
                          } finally {
                            try {
                              a || null == n.return || n.return();
                            } finally {
                              if (i) throw r;
                            }
                          }
                          return l;
                        }
                      })(l, a) ||
                      t(l, a) ||
                      (function () {
                        throw new TypeError(
                          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                      })())[0],
                    p = i;
                  r("update:selectedValue", p), r("selectedChange", p, s);
                }
              },
              k = function (e) {
                r("nodeClick", e);
              },
              w = function (e, t) {
                if (e) d.hiddenPaths = C(C({}, d.hiddenPaths), {}, l({}, t, 1));
                else {
                  var n = C({}, d.hiddenPaths);
                  delete n[t], (d.hiddenPaths = n);
                }
              },
              N = function (t, n) {
                e.collapsedOnClickBrackets && w(t, n), r("bracketsClick", t);
              },
              j = function (e, t) {
                w(e, t), r("iconClick", e);
              },
              S = function (t, n) {
                var o = h(e.data),
                  l = e.rootPath;
                new Function(
                  "data",
                  "val",
                  "data".concat(n.slice(l.length), "=val")
                )(o, t),
                  r("update:data", o);
              };
            return (
              (0, a.watchEffect)(function () {
                y.value &&
                  (function (e) {
                    throw new Error("[VueJSONPretty] ".concat(e));
                  })(y.value);
              }),
              (0, a.watchEffect)(function () {
                s.value && v();
              }),
              function () {
                var t,
                  n,
                  o =
                    null !== (t = e.renderNodeKey) && void 0 !== t
                      ? t
                      : i.renderNodeKey,
                  r =
                    null !== (n = e.renderNodeValue) && void 0 !== n
                      ? n
                      : i.renderNodeValue,
                  l =
                    d.visibleData &&
                    d.visibleData.map(function (t) {
                      return (0,
                      a.createVNode)(g, { key: t.id, node: t, collapsed: !!d.hiddenPaths[t.path], showDoubleQuotes: e.showDoubleQuotes, showLength: e.showLength, checked: f.value.includes(t.path), selectableType: e.selectableType, showLine: e.showLine, showLineNumber: e.showLineNumber, showSelectController: e.showSelectController, selectOnClickNode: e.selectOnClickNode, nodeSelectable: e.nodeSelectable, highlightSelectedNode: e.highlightSelectedNode, editable: e.editable, editableTrigger: e.editableTrigger, showIcon: e.showIcon, renderNodeKey: o, renderNodeValue: r, onNodeClick: k, onBracketsClick: N, onIconClick: j, onSelectedChange: m, onValueChange: S, style: e.itemHeight && 20 !== e.itemHeight ? { lineHeight: "".concat(e.itemHeight, "px") } : {} }, null);
                    });
                return (0, a.createVNode)(
                  "div",
                  {
                    ref: c,
                    class: { "vjs-tree": !0, "is-virtual": e.virtual },
                    onScroll: e.virtual ? b : void 0,
                    style: e.showLineNumber
                      ? C(
                          {
                            paddingLeft: "".concat(
                              12 * Number(u.value.length.toString().length),
                              "px"
                            ),
                          },
                          e.style
                        )
                      : e.style,
                  },
                  [
                    e.virtual
                      ? (0, a.createVNode)(
                          "div",
                          {
                            class: "vjs-tree-list",
                            style: { height: "".concat(e.height, "px") },
                          },
                          [
                            (0, a.createVNode)(
                              "div",
                              {
                                class: "vjs-tree-list-holder",
                                style: {
                                  height: "".concat(
                                    s.value.length * e.itemHeight,
                                    "px"
                                  ),
                                },
                              },
                              [
                                (0, a.createVNode)(
                                  "div",
                                  {
                                    class: "vjs-tree-list-holder-inner",
                                    style: {
                                      transform: "translateY(".concat(
                                        d.translateY,
                                        "px)"
                                      ),
                                    },
                                  },
                                  [l]
                                ),
                              ]
                            ),
                          ]
                        )
                      : l,
                  ]
                );
              }
            );
          },
        });
      })(),
      r
    );
  })();
});
