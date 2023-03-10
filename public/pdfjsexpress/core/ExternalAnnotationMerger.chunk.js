/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [7],
    {
      448: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(475),
          ma = r(476),
          fa;
        (function (da) {
          da[(da.EXTERNAL_XFDF_NOT_REQUESTED = 0)] =
            'EXTERNAL_XFDF_NOT_REQUESTED';
          da[(da.EXTERNAL_XFDF_NOT_AVAILABLE = 1)] =
            'EXTERNAL_XFDF_NOT_AVAILABLE';
          da[(da.EXTERNAL_XFDF_AVAILABLE = 2)] = 'EXTERNAL_XFDF_AVAILABLE';
        })(fa || (fa = {}));
        Ba = (function () {
          function da(z) {
            this.aa = z;
            this.state = fa.EXTERNAL_XFDF_NOT_REQUESTED;
          }
          da.prototype.Tba = function () {
            var z = this;
            return function (x, y, f) {
              return Object(pa.b)(z, void 0, void 0, function () {
                var e,
                  a,
                  b,
                  h,
                  n,
                  ba,
                  w,
                  ea = this,
                  ja;
                return Object(pa.d)(this, function (aa) {
                  switch (aa.label) {
                    case 0:
                      if (this.state !== fa.EXTERNAL_XFDF_NOT_REQUESTED)
                        return [3, 2];
                      e = this.aa.getDocument().ps();
                      return [4, this.naa(e)];
                    case 1:
                      (a = aa.ea()),
                        (b = this.r6(a)),
                        (this.iI =
                          null !==
                            (ja =
                              null === b || void 0 === b
                                ? void 0
                                : b.parse()) && void 0 !== ja
                            ? ja
                            : null),
                        (this.state =
                          null === this.iI
                            ? fa.EXTERNAL_XFDF_NOT_AVAILABLE
                            : fa.EXTERNAL_XFDF_AVAILABLE),
                        (aa.label = 2);
                    case 2:
                      if (this.state === fa.EXTERNAL_XFDF_NOT_AVAILABLE)
                        return f(x), [2];
                      h = new DOMParser();
                      n = h.parseFromString(x, 'text/xml');
                      y.forEach(function (ca) {
                        ea.merge(n, ea.iI, ca - 1);
                      });
                      ba = new XMLSerializer();
                      w = ba.serializeToString(n);
                      f(w);
                      return [2];
                  }
                });
              });
            };
          };
          da.prototype.YL = function (z) {
            this.naa = z;
          };
          da.prototype.le = function () {
            this.iI = void 0;
            this.state = fa.EXTERNAL_XFDF_NOT_REQUESTED;
          };
          da.prototype.r6 = function (z) {
            return z
              ? Array.isArray(z)
                ? new ka.a(z)
                : 'string' !== typeof z
                ? null
                : new DOMParser()
                    .parseFromString(z, 'text/xml')
                    .querySelector('xfdf > add')
                ? new ka.a(z)
                : new ma.a(z)
              : null;
          };
          da.prototype.merge = function (z, x, y) {
            var f = this;
            0 === y && (this.mea(z, x.kp), this.oea(z, x.QH));
            var e = x.ca[y];
            e &&
              (this.pea(z, e.ln),
              this.rea(z, e.RZ, x.Yv),
              this.qea(z, e.page, y),
              this.nea(z, e.HR));
            e = this.aa.Ob();
            if (y === e - 1) {
              var a = x.Yv;
              Object.keys(a).forEach(function (b) {
                a[b].yJ || f.sV(z, b, a[b]);
              });
            }
          };
          da.prototype.mea = function (z, x) {
            null !== x &&
              ((z = this.lv(z)), this.Bq(z, 'calculation-order', x));
          };
          da.prototype.oea = function (z, x) {
            null !== x && ((z = this.lv(z)), this.Bq(z, 'document-actions', x));
          };
          da.prototype.pea = function (z, x) {
            var y = this,
              f = this.kv(z.querySelector('xfdf'), 'annots');
            Object.keys(x).forEach(function (e) {
              y.Bq(f, '[name="' + e + '"]', x[e]);
            });
          };
          da.prototype.rea = function (z, x, y) {
            var f = this;
            if (0 !== x.length) {
              var e = this.lv(z);
              x.forEach(function (a) {
                var b = a.getAttribute('field'),
                  h = y[b];
                h && (f.sV(z, b, h), f.Bq(e, 'null', a));
              });
            }
          };
          da.prototype.sV = function (z, x, y) {
            var f = this.lv(z);
            null !== y.OB && this.Bq(f, 'ffield [name="' + x + '"]', y.OB);
            z = this.kv(z.querySelector('xfdf'), 'fields');
            x = x.split('.');
            this.iL(z, x, 0, y.value);
            y.yJ = !0;
          };
          da.prototype.qea = function (z, x, y) {
            null !== x &&
              ((z = this.lv(z)),
              (z = this.kv(z, 'pages')),
              this.Bq(z, '[number="' + (y + 1) + '"]', x));
          };
          da.prototype.nea = function (z, x) {
            Object.keys(x).forEach(function (y) {
              (y = z.querySelector('annots [name="' + y + '"]')) &&
                y.parentElement.removeChild(y);
            });
          };
          da.prototype.iL = function (z, x, y, f) {
            if (y === x.length)
              (x = document.createElementNS('', 'value')),
                (x.textContent = f),
                this.Bq(z, 'value', x);
            else {
              var e = x[y];
              this.kv(z, '[name="' + e + '"]', 'field').setAttribute('name', e);
              z = z.querySelectorAll('[name="' + e + '"]');
              1 === z.length
                ? this.iL(z[0], x, y + 1, f)
                : ((e = this.Z9(z)),
                  this.iL(
                    y === x.length - 1 ? e : this.$ka(z, e),
                    x,
                    y + 1,
                    f
                  ));
            }
          };
          da.prototype.Z9 = function (z) {
            for (var x = null, y = 0; y < z.length; y++) {
              var f = z[y];
              if (
                0 === f.childElementCount ||
                (1 === f.childElementCount && 'value' === f.children[0].tagName)
              ) {
                x = f;
                break;
              }
            }
            return x;
          };
          da.prototype.$ka = function (z, x) {
            for (var y = 0; y < z.length; y++) if (z[y] !== x) return z[y];
            return null;
          };
          da.prototype.Bq = function (z, x, y) {
            x = z.querySelector(x);
            null !== x && z.removeChild(x);
            z.appendChild(y);
          };
          da.prototype.lv = function (z) {
            var x = z.querySelector('pdf-info');
            if (null !== x) return x;
            x = this.kv(z.querySelector('xfdf'), 'pdf-info');
            x.setAttribute('xmlns', 'http://www.pdftron.com/pdfinfo');
            x.setAttribute('version', '2');
            x.setAttribute('import-version', '4');
            return x;
          };
          da.prototype.kv = function (z, x, y) {
            var f = z.querySelector(x);
            if (null !== f) return f;
            f = document.createElementNS('', y || x);
            z.appendChild(f);
            return f;
          };
          return da;
        })();
        ua['default'] = Ba;
      },
      460: function (Ba, ua) {
        Ba = (function () {
          function r() {}
          r.prototype.rA = function (pa) {
            var ka = { kp: null, QH: null, Yv: {}, ca: {} };
            pa = new DOMParser().parseFromString(pa, 'text/xml');
            ka.kp = pa.querySelector('pdf-info calculation-order');
            ka.QH = pa.querySelector('pdf-info document-actions');
            ka.Yv = this.jfa(pa);
            ka.ca = this.vfa(pa);
            return ka;
          };
          r.prototype.jfa = function (pa) {
            var ka = pa.querySelector('fields');
            pa = pa.querySelectorAll('pdf-info > ffield');
            if (null === ka && null === pa) return {};
            var ma = {};
            this.b4(ma, ka);
            this.Z3(ma, pa);
            return ma;
          };
          r.prototype.b4 = function (pa, ka) {
            if (null !== ka && ka.children) {
              for (var ma = [], fa = 0; fa < ka.children.length; fa++) {
                var da = ka.children[fa];
                ma.push({ name: da.getAttribute('name'), element: da });
              }
              for (; 0 !== ma.length; )
                for (
                  ka = ma.shift(), fa = 0;
                  fa < ka.element.children.length;
                  fa++
                )
                  (da = ka.element.children[fa]),
                    'value' === da.tagName
                      ? (pa[ka.name] = {
                          value: da.textContent,
                          OB: null,
                          yJ: !1,
                        })
                      : da.children &&
                        ma.push({
                          name: ka.name + '.' + da.getAttribute('name'),
                          element: da,
                        });
            }
          };
          r.prototype.Z3 = function (pa, ka) {
            ka.forEach(function (ma) {
              var fa = ma.getAttribute('name');
              pa[fa]
                ? (pa[fa].OB = ma)
                : (pa[fa] = { value: null, OB: ma, yJ: !1 });
            });
          };
          r.prototype.vfa = function (pa) {
            var ka = this,
              ma = {};
            pa.querySelectorAll('pdf-info widget').forEach(function (fa) {
              var da = parseInt(fa.getAttribute('page'), 10) - 1;
              ka.OC(ma, da);
              ma[da].RZ.push(fa);
            });
            pa.querySelectorAll('pdf-info page').forEach(function (fa) {
              var da = parseInt(fa.getAttribute('number'), 10) - 1;
              ka.OC(ma, da);
              ma[da].page = fa;
            });
            this.iT(pa).forEach(function (fa) {
              var da = parseInt(fa.getAttribute('page'), 10),
                z = fa.getAttribute('name');
              ka.OC(ma, da);
              ma[da].ln[z] = fa;
            });
            this.VS(pa).forEach(function (fa) {
              var da = parseInt(fa.getAttribute('page'), 10);
              fa = fa.textContent;
              ka.OC(ma, da);
              ma[da].HR[fa] = !0;
            });
            return ma;
          };
          r.prototype.OC = function (pa, ka) {
            pa[ka] || (pa[ka] = { ln: {}, HR: {}, RZ: [], page: null });
          };
          return r;
        })();
        ua.a = Ba;
      },
      475: function (Ba, ua, r) {
        var pa = r(1),
          ka = r(0);
        r.n(ka);
        Ba = (function (ma) {
          function fa(da) {
            var z = ma.call(this) || this;
            z.M9 = Array.isArray(da) ? da : [da];
            return z;
          }
          Object(pa.c)(fa, ma);
          fa.prototype.parse = function () {
            var da = this,
              z = { kp: null, QH: null, Yv: {}, ca: {} };
            this.M9.forEach(function (x) {
              z = Object(ka.merge)(z, da.rA(x));
            });
            return z;
          };
          fa.prototype.iT = function (da) {
            var z = [];
            da.querySelectorAll('add > *').forEach(function (x) {
              z.push(x);
            });
            da.querySelectorAll('modify > *').forEach(function (x) {
              z.push(x);
            });
            return z;
          };
          fa.prototype.VS = function (da) {
            return da.querySelectorAll('delete > *');
          };
          return fa;
        })(r(460).a);
        ua.a = Ba;
      },
      476: function (Ba, ua, r) {
        var pa = r(1);
        Ba = (function (ka) {
          function ma(fa) {
            var da = ka.call(this) || this;
            da.N9 = fa;
            return da;
          }
          Object(pa.c)(ma, ka);
          ma.prototype.parse = function () {
            return this.rA(this.N9);
          };
          ma.prototype.iT = function (fa) {
            return fa.querySelectorAll('annots > *');
          };
          ma.prototype.VS = function () {
            return [];
          };
          return ma;
        })(r(460).a);
        ua.a = Ba;
      },
    },
  ]);
}.call(this || window));
