/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [0],
    {
      433: function (Ba, ua, r) {
        r.r(ua);
        r.d(ua, 'ByteRangeRequest', function () {
          return ba;
        });
        var pa = r(1),
          ka = r(0);
        r.n(ka);
        var ma = r(2),
          fa = r(147);
        Ba = r(94);
        var da = r(246),
          z = r(73),
          x = r(71),
          y = r(245),
          f = r(163);
        r = r(375);
        var e = [],
          a = [],
          b = window,
          h = (function () {
            return function () {
              this.em = 1;
            };
          })(),
          n;
        (function (ea) {
          ea[(ea.UNSENT = 0)] = 'UNSENT';
          ea[(ea.DONE = 4)] = 'DONE';
        })(n || (n = {}));
        var ba = (function () {
            function ea(ja, aa, ca, ia) {
              var ha = this;
              this.url = ja;
              this.range = aa;
              this.af = ca;
              this.withCredentials = ia;
              this.K1 = n;
              this.request = new XMLHttpRequest();
              this.request.open('GET', this.url, !0);
              b.Uint8Array && (this.request.responseType = 'arraybuffer');
              ia && (this.request.withCredentials = ia);
              w.DISABLE_RANGE_HEADER ||
                (Object(ka.isUndefined)(aa.stop)
                  ? this.request.setRequestHeader('Range', 'bytes=' + aa.start)
                  : this.request.setRequestHeader(
                      'Range',
                      ['bytes=', aa.start, '-', aa.stop - 1].join('')
                    ));
              ca &&
                Object.keys(ca).forEach(function (la) {
                  ha.request.setRequestHeader(la, ca[la]);
                });
              this.request.overrideMimeType
                ? this.request.overrideMimeType(
                    'text/plain; charset=x-user-defined'
                  )
                : this.request.setRequestHeader(
                    'Accept-Charset',
                    'x-user-defined'
                  );
              this.status = y.a.NOT_STARTED;
            }
            ea.prototype.start = function (ja) {
              var aa = this,
                ca = this.request;
              ca.onreadystatechange = function () {
                if (aa.aborted)
                  return (aa.status = y.a.ABORTED), ja({ code: y.a.ABORTED });
                if (this.readyState === aa.K1.DONE) {
                  aa.pC();
                  var ia = 0 === window.document.URL.indexOf('file:///');
                  200 === ca.status ||
                  206 === ca.status ||
                  (ia && 0 === ca.status)
                    ? ((ia = b.vT(this)), aa.EM(ia, ja))
                    : ((aa.status = y.a.ERROR),
                      ja({ code: aa.status, status: aa.status }));
                }
              };
              this.request.send(null);
              this.status = y.a.STARTED;
            };
            ea.prototype.EM = function (ja, aa) {
              this.status = y.a.SUCCESS;
              if (aa) return aa(!1, ja);
            };
            ea.prototype.abort = function () {
              this.pC();
              this.aborted = !0;
              this.request.abort();
            };
            ea.prototype.pC = function () {
              var ja = Object(f.c)(this.url, this.range, a);
              -1 !== ja && a.splice(ja, 1);
              if (0 < e.length) {
                ja = e.shift();
                var aa = new ea(
                  ja.url,
                  ja.range,
                  this.af,
                  this.withCredentials
                );
                ja.request = aa;
                a.push(ja);
                aa.start(Object(f.d)(ja));
              }
            };
            ea.prototype.extend = function (ja) {
              var aa = Object.assign({}, this, ja.prototype);
              aa.constructor = ja;
              return aa;
            };
            return ea;
          })(),
          w = (function (ea) {
            function ja(aa, ca, ia, ha, la) {
              ia = ea.call(this, aa, ia, ha) || this;
              ia.hm = {};
              ia.TA = ca;
              ia.url = aa;
              ia.DISABLE_RANGE_HEADER = !1;
              ia.Kx = ba;
              ia.BN = 3;
              ia.af = la || {};
              return ia;
            }
            Object(pa.c)(ja, ea);
            ja.prototype.Ev = function (aa, ca, ia) {
              var ha = -1 === aa.indexOf('?') ? '?' : '&';
              switch (ia) {
                case !1:
                case x.a.NEVER_CACHE:
                  aa = aa + ha + '_=' + Object(ka.uniqueId)();
                  break;
                case !0:
                case x.a.CACHE:
                  aa =
                    aa +
                    ha +
                    '_=' +
                    ca.start +
                    ',' +
                    (Object(ka.isUndefined)(ca.stop) ? '' : ca.stop);
              }
              return aa;
            };
            ja.prototype.uR = function (aa, ca, ia, ha) {
              void 0 === ia && (ia = {});
              return new this.Kx(aa, ca, ia, ha);
            };
            ja.prototype.C9 = function (aa, ca, ia, ha, la) {
              for (var na = 0; na < e.length; na++)
                if (
                  Object(ka.isEqual)(e[na].range, ca) &&
                  Object(ka.isEqual)(e[na].url, aa)
                )
                  return e[na].Kg.push(ha), e[na].uD++, null;
              for (na = 0; na < a.length; na++)
                if (
                  Object(ka.isEqual)(a[na].range, ca) &&
                  Object(ka.isEqual)(a[na].url, aa)
                )
                  return a[na].Kg.push(ha), a[na].uD++, null;
              ia = { url: aa, range: ca, TA: ia, Kg: [ha], uD: 1 };
              if (0 === e.length && a.length < this.BN)
                return (
                  a.push(ia),
                  (ia.request = this.uR(aa, ca, la, this.withCredentials)),
                  ia
                );
              e.push(ia);
              return null;
            };
            ja.prototype.ao = function (aa, ca, ia) {
              var ha = this.Ev(aa, ca, this.TA);
              (aa = this.C9(ha, ca, this.TA, ia, this.af)) &&
                aa.request.start(Object(f.d)(aa));
              return function () {
                var la = Object(f.c)(ha, ca, a);
                if (-1 !== la) {
                  var na = --a[la].uD;
                  0 === na && a[la].request && a[la].request.abort();
                } else
                  (la = Object(f.c)(ha, ca, e)),
                    -1 !== la &&
                      ((na = --e[la].uD), 0 === na && e.splice(la, 1));
              };
            };
            ja.prototype.$S = function () {
              return { start: -fa.a };
            };
            ja.prototype.bca = function () {
              var aa = -(fa.a + fa.e);
              return { start: aa - fa.d, end: aa };
            };
            ja.prototype.bt = function (aa) {
              var ca = this;
              this.ZA = !0;
              var ia = fa.a;
              this.ao(this.url, this.$S(), function (ha, la, na) {
                function qa() {
                  var ra = ca.Xd.WS();
                  ca.ao(ca.url, ra, function (ta, va) {
                    if (ta)
                      return (
                        Object(ma.j)('Error loading central directory: ' + ta),
                        aa(ta)
                      );
                    va = Object(z.a)(va);
                    if (va.length !== ra.stop - ra.start)
                      return aa(
                        'Invalid XOD file: Zip central directory data is wrong size! Should be ' +
                          (ra.stop - ra.start) +
                          ' but is ' +
                          va.length
                      );
                    ca.Xd.QW(va);
                    ca.rH = !0;
                    ca.ZA = !1;
                    return aa(!1);
                  });
                }
                if (ha)
                  return (
                    Object(ma.j)('Error loading end header: ' + ha),
                    aa(ha, la, na)
                  );
                la = Object(z.a)(la);
                if (la.length !== ia)
                  return aa(
                    'Invalid XOD file: Zip end header data is wrong size!'
                  );
                try {
                  ca.Xd = new da.a(la);
                } catch (ra) {
                  return aa(ra);
                }
                ca.Xd.Gda
                  ? ca.ao(ca.url, ca.bca(), function (ra, ta) {
                      if (ra)
                        return (
                          Object(ma.j)('Error loading zip64 header: ' + ra),
                          aa(ra)
                        );
                      ta = Object(z.a)(ta);
                      ca.Xd.Zda(ta);
                      qa();
                    })
                  : qa();
              });
            };
            ja.prototype.sT = function (aa) {
              aa(Object.keys(this.Xd.An));
            };
            ja.prototype.lL = function (aa, ca) {
              var ia = this;
              if (this.Xd.mR(aa)) {
                var ha = this.Xd.jC(aa);
                if (ha in this.hm) {
                  var la = this.Th[aa];
                  la.Pr = this.hm[ha];
                  la.Pr.em++;
                  la.cancel = la.Pr.cancel;
                } else {
                  var na = this.Xd.paa(aa),
                    qa = this.ao(this.url, na, function (ta, va) {
                      ta
                        ? (Object(ma.j)(
                            'Error loading part "' + aa + '": ' + ta
                          ),
                          ia.ao(ia.url, na, function (oa, wa) {
                            if (oa) return ca(oa, aa);
                            ia.UW(wa, na, ha, aa, ca);
                          }))
                        : ia.UW(va, na, ha, aa, ca);
                    }),
                    ra = this.Th[aa];
                  ra &&
                    ((ra.$Y = !0),
                    (ra.cancel = function () {
                      ra.Pr.em--;
                      0 === ra.Pr.em && (qa(), delete ia.hm[ha]);
                    }),
                    (this.hm[ha] = new h(ha)),
                    (ra.Pr = this.hm[ha]),
                    (ra.Pr.cancel = ra.cancel));
                }
              } else
                delete this.Th[aa],
                  ca(Error('File not found: "' + aa + '"'), aa);
            };
            ja.prototype.UW = function (aa, ca, ia, ha, la) {
              if (aa.length !== ca.stop - ca.start)
                la(Error('Part data is wrong size!'), ha);
              else {
                do {
                  if (!this.hm[ia]) return;
                  ha = this.hm[ia].em;
                  for (var na = ca.Cq.length, qa = 0; qa < na; ++qa) {
                    var ra = ca.Cq[qa];
                    la(
                      !1,
                      ra.yq,
                      aa['string' === typeof aa ? 'substring' : 'subarray'](
                        ra.start,
                        ra.stop
                      ),
                      this.Xd.wU(ra.yq)
                    );
                    ra.yq in this.Th && delete this.Th[ra.yq];
                  }
                } while (ha !== this.hm[ia].em);
                delete this.hm[ia];
              }
            };
            ja.DISABLE_RANGE_HEADER = !1;
            ja.BN = 3;
            return ja;
          })(Ba.a);
        (function (ea) {
          function ja(aa, ca, ia) {
            var ha = ea.call(this) || this,
              la;
            for (la in aa) ha[la] = aa[la];
            ha.$oa = aa;
            ha.startOffset = ca;
            ha.endOffset = ia;
            ha.uR = function (na, qa, ra, ta) {
              Object(ka.isUndefined)(qa.stop)
                ? ((qa.start += ha.endOffset), (qa.stop = ha.endOffset))
                : ((qa.start += ha.startOffset), (qa.stop += ha.startOffset));
              na = ha.Ev(ha.url, qa, ha.TA);
              return new aa.Kx(na, qa, ra, ta);
            };
            return ha;
          }
          Object(pa.c)(ja, ea);
          return ja;
        })(w);
        Object(r.a)(w);
        Object(r.b)(w);
        ua['default'] = w;
      },
    },
  ]);
}.call(this || window));
