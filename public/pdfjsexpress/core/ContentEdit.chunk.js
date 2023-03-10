/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [6],
    {
      164: function (Ba, ua, r) {
        function pa(Ra, Ma, Aa, Ja) {
          return Object(ca.b)(void 0, void 0, void 0, function () {
            var Ia, Pa, Wa, Qa, Fa, Ea, Ua, Va, Xa;
            return Object(ca.d)(this, function (cb) {
              switch (cb.label) {
                case 0:
                  return (
                    (Ia = Ka.getDocument()),
                    (Pa = [1]),
                    [4, Object(ia.c)(Ma, { extension: 'pdf' })]
                  );
                case 1:
                  return (
                    (Wa = cb.ea()),
                    (Qa = Ka.pa()),
                    (Ua = (Ea = oa.a).$fa),
                    [4, Wa.NB()]
                  );
                case 2:
                  return (
                    (Fa = Ua.apply(Ea, [cb.ea().xfdfString, Ra])),
                    (Va = !0),
                    [4, Ia.zf(Wa, Pa, Ra, Va)]
                  );
                case 3:
                  return cb.ea(), [4, Ia.ng([Ra + 1], Va)];
                case 4:
                  return (
                    cb.ea(),
                    (Xa = Qa.Gb().filter(function (eb) {
                      return eb.YJ() && eb.PageNumber === Ra;
                    })),
                    Qa.Jj(Xa, { force: !0, source: 'contentEditTool' }),
                    [4, Qa.HJ(Fa)]
                  );
                case 5:
                  return (
                    cb.ea(),
                    Ka.getDocument().sL(),
                    Ka.rL(Ra),
                    Ka.Qe(),
                    fa(Ra),
                    h(Ra, Aa.galleys, Ja),
                    h(Ra, Aa.objects, Ja),
                    [2]
                  );
              }
            });
          });
        }
        function ka(Ra) {
          Ra = new DOMParser()
            .parseFromString(Ra, 'text/html')
            .documentElement.querySelector('body');
          Ra.querySelectorAll('p').forEach(function (Ma) {
            Ma.querySelectorAll('span').forEach(function (Ia) {
              var Pa = Ia.getAttribute('style');
              Pa = ma(Pa, Ia.innerHTML);
              Ia.innerHTML = Pa;
            });
            var Aa = Ma.getAttribute('style'),
              Ja = Ma.innerHTML.replaceAll('<br>', '');
            Ma.innerHTML = ma(Aa, Ja);
          });
          return Ra.innerHTML.trim();
        }
        function ma(Ra, Ma) {
          Ra.includes('bold') && (Ma = '<strong>' + Ma + '</strong>');
          Ra.includes('italic') && (Ma = '<em>' + Ma + '</em>');
          Ra.includes('text-decoration: underline') &&
            (Ma = '<u>' + Ma + '</u>');
          return Ma;
        }
        function fa(Ra) {
          var Ma = Ka.pa(),
            Aa = Ma.Gb().filter(function (Ja) {
              return Ja.Jh() && Ja.PageNumber === Ra;
            });
          Ma.Jj(Aa, { force: !0, source: 'contentEditTool' });
        }
        function da(Ra, Ma) {
          Ma.forEach(function (Aa) {
            La[Ra] || (La[Ra] = []);
            La[Ra].find(function (Ja) {
              return Ja.id === Aa.id;
            }) || La[Ra].push(Aa);
          });
        }
        function z(Ra, Ma) {
          Ma.forEach(function (Aa) {
            Ha[Ra] || (Ha[Ra] = []);
            Ha[Ra].find(function (Ja) {
              return Ja.id === Aa.id;
            }) || Ha[Ra].push(Aa);
          });
        }
        function x(Ra) {
          var Ma = new DOMParser(),
            Aa = Ma.parseFromString(Ra, 'text/xml');
          Aa.querySelector('parsererror') &&
            (Aa = Ma.parseFromString('<Root>' + Ra + '</Root>', 'text/xml'));
          Aa.querySelectorAll('a').forEach(function (Ja) {
            var Ia = Ja.childNodes[0];
            Array.from(Ja.querySelectorAll('*')).find(function (Pa) {
              return 'u' === Pa.tagName.toLowerCase();
            }) ||
              ((Ja = document.createElement('u')),
              Ia.after(Ja),
              Ja.appendChild(Ia));
          });
          return new XMLSerializer().serializeToString(Aa);
        }
        function y(Ra, Ma, Aa, Ja) {
          this.top = Ra;
          this.left = Ma;
          this.bottom = Aa;
          this.right = Ja;
          this.topVal = function () {
            return Math.round(this.top);
          };
          this.bottomVal = function () {
            return Math.round(this.bottom);
          };
          this.leftVal = function () {
            return Math.round(this.left);
          };
          this.rightVal = function () {
            return Math.round(this.right);
          };
          this.height = function () {
            return Math.round(Math.abs(this.top - this.bottom));
          };
          this.width = function () {
            return Math.round(this.right - this.left);
          };
          this.MQ = function (Ia) {
            return (
              this.topVal() !== Ia.topVal() ||
              this.leftVal() !== Ia.leftVal() ||
              this.bottomVal() !== Ia.bottomVal() ||
              this.rightVal() !== Ia.rightVal()
            );
          };
        }
        function f(Ra, Ma, Aa, Ja, Ia) {
          this.id = Ra;
          this.pagenum = Ma;
          this.galleysContents = Aa;
          this.contents = Ja;
          this.galleyBox = Ia;
          Object(va.g)(Ha);
        }
        function e(Ra, Ma, Aa, Ja) {
          this.id = Ma;
          this.type = Ra;
          this.bbox = Aa;
          this.pagenum = Ja;
        }
        function a(Ra, Ma, Aa, Ja, Ia) {
          this.id = Ra;
          this.pagecount = Ma;
          this.pageBBox = Aa;
          this.galleys = Ja;
          this.objects = Ia;
        }
        function b(Ra, Ma, Aa, Ja, Ia) {
          var Pa = [];
          new DOMParser()
            .parseFromString(Ja, 'text/html')
            .documentElement.querySelectorAll('p')
            .forEach(function (Ea, Ua) {
              Pa[Ua] = Ea.innerHTML;
            });
          Aa = new DOMParser().parseFromString(Aa, 'text/html');
          var Wa = null;
          Aa.documentElement.querySelectorAll('p').forEach(function (Ea, Ua) {
            Ua < Pa.length
              ? ((Ea.innerHTML = Pa[Ua]),
                (Wa = Ea.getAttribute('style')),
                (Wa = Wa.replace('font:italic', 'font:normal')),
                (Wa = Wa.replace(' bold ', ' normal ')),
                (Wa = Wa.replace('underline:1;', 'underline:0;')),
                Ea.setAttribute('style', Wa))
              : Ea.remove();
          });
          for (
            Ja = Aa.documentElement.querySelectorAll('p').length;
            Ja < Pa.length;
            Ja++
          ) {
            var Qa = document.createElement('p');
            Qa.setAttribute('id', '0');
            Qa.innerHTML = Pa[Ja];
            null != Wa && Qa.setAttribute('style', Wa);
            Aa.documentElement.querySelector('body').appendChild(Qa);
          }
          Aa = Aa.documentElement.querySelector('body').innerHTML;
          var Fa = '';
          Ha[Ra].forEach(function (Ea) {
            Ea.id === Ia && (Fa = Ea);
          });
          if ('' === Fa) return '';
          Ma = "<DOC id='" + Ma.id + "' pagecount='" + Ma.pagecount + "'>";
          Ma =
            Ma +
            ("<STORY galley_ids='" + Ia + "' pagenum='" + Ra + "'><galleys>") +
            (Fa.galleysContents + '</galleys>');
          Fa.contents = Aa;
          Ma = Ma + Aa + '\n</STORY>';
          return (Ma += '</DOC>');
        }
        function h(Ra, Ma, Aa) {
          var Ja = [],
            Ia = Ka.getDocument(),
            Pa = null;
          Ma.forEach(function (Wa) {
            if (Wa instanceof e) {
              var Qa = Ia.Sn(Ra, Wa.bbox.leftVal(), Wa.bbox.topVal());
              var Fa = Qa.x;
              var Ea = Qa.y;
              var Ua = Ia.Sn(Ra, Wa.bbox.rightVal(), Wa.bbox.bottomVal());
              Qa = Ua.x;
              Ua = Ua.y;
            } else if (Wa instanceof f)
              (Qa = Ia.Sn(Ra, Wa.galleyBox.leftVal(), Wa.galleyBox.topVal())),
                (Fa = Qa.x),
                (Ea = Qa.y),
                (Ua = Ia.Sn(
                  Ra,
                  Wa.galleyBox.rightVal(),
                  Wa.galleyBox.bottomVal()
                )),
                (Qa = Ua.x),
                (Ua = Ua.y);
            else return;
            var Va = new window.Core.Annotations.RectangleAnnotation(),
              Xa = ta.a.OBJECT;
            Wa instanceof f && (Xa = ta.a.TEXT);
            Va.Eia(Wa, Xa);
            Va.PageNumber = Wa.pagenum;
            Va.X = Fa;
            Va.Y = Ea;
            Va.Width = Qa - Fa;
            Va.Height = Ua - Ea;
            Va.StrokeColor = new ha.a('#3183C8');
            Va.FillColor = new ha.a(255, 255, 255, 0.01);
            Va.Style = 'dash';
            Va.Dashes = '4,3';
            Va.yB();
            Va.selectionModel = la.a;
            Ja.push(Va);
            'undefined' !== typeof Aa && Aa === Wa.id && (Pa = Va);
          });
          Ma = Ka.pa();
          Ma.ri(Ja);
          Pa && Ma.rg(Pa);
          Ma.bf(Ja);
        }
        function n(Ra, Ma, Aa) {
          return Object(ca.b)(this, void 0, void 0, function () {
            var Ja, Ia, Pa, Wa, Qa;
            return Object(ca.d)(this, function (Fa) {
              switch (Fa.label) {
                case 0:
                  Ja = Ra.data;
                  Pa = Ja.cmd;
                  switch (Pa) {
                    case 'isReady':
                      return [3, 1];
                    case 'initialiseInfixServer':
                      return [3, 3];
                    case 'exportFile':
                      return [3, 4];
                    case 'importText':
                      return [3, 5];
                    case 'transformObject':
                      return [3, 5];
                    case 'deleteObject':
                      return [3, 6];
                  }
                  return [3, 7];
                case 1:
                  return [4, Object(qa.b)()];
                case 2:
                  return (
                    (Wa = Fa.ea()),
                    wa.postMessage({ cmd: 'initialiseInfixServer', l: Wa }),
                    [3, 7]
                  );
                case 3:
                  return (
                    (Qa = ba(Ja.resultsXML))
                      ? Ma()
                      : Aa('License key does not have content edit permission'),
                    [3, 7]
                  );
                case 4:
                  return (
                    Ja.exportPerformed
                      ? w(
                          Ja.pageNumber,
                          Ja.exportXML,
                          Ja.objectXML,
                          Ja.resultsXML
                        )
                      : ((Ia = Ca[Ja.pageNumber]),
                        z(Ja.pageNumber, Ia.galleys),
                        da(Ja.pageNumber, Ia.objects),
                        fa(Ja.pageNumber),
                        h(Ja.pageNumber, Ia.galleys),
                        h(Ja.pageNumber, Ia.objects)),
                    [3, 7]
                  );
                case 5:
                  return (
                    (Ia = Ca[Ja.pageNumber]),
                    aa(Ja.pageNumber, Ja.resultsXML),
                    pa(Ja.pageNumber, Ja.pdfBuffer, Ia, Ja.id),
                    [3, 7]
                  );
                case 6:
                  return (
                    (Ia = Ca[Ja.pageNumber]),
                    aa(Ja.pageNumber, Ja.resultsXML),
                    (Ia.galleys = Ia.galleys.filter(function (Ea) {
                      return Ea.id !== Ja.id;
                    })),
                    (Ia.objects = Ia.objects.filter(function (Ea) {
                      return Ea.id !== Ja.id;
                    })),
                    pa(Ja.pageNumber, Ja.pdfBuffer, Ia),
                    [3, 7]
                  );
                case 7:
                  return [2];
              }
            });
          });
        }
        function ba(Ra) {
          Ra = new Uint8Array(Ra);
          var Ma = new TextDecoder('utf-8').decode(Ra);
          Ra = !1;
          Ma = new DOMParser()
            .parseFromString(Ma, 'text/xml')
            .getElementsByTagName('LicenseCheck');
          null !== Ma &&
            0 < Ma.length &&
            ((Ma = Ma[0].getElementsByTagName('Status')[0].innerHTML),
            'error' !== Ma && 'ok' === Ma && (Ra = !0));
          return Ra;
        }
        function w(Ra, Ma, Aa, Ja) {
          var Ia = new Uint8Array(Ma),
            Pa = new TextDecoder('utf-8');
          Ma = Pa.decode(Ia);
          Ia = new Uint8Array(Aa);
          Aa = Pa.decode(Ia);
          Ia = new Uint8Array(Ja);
          Ja = Pa.decode(Ia);
          Ca[Ra] = ja(Ra, Ma, Aa, Ja);
          Ja = Ca[Ra];
          z(Ra, Ja.galleys);
          da(Ra, Ja.objects);
          fa(Ra);
          h(Ra, Ja.galleys);
          h(Ra, Ja.objects);
        }
        function ea(Ra, Ma) {
          Ra = parseFloat(Ra);
          return isNaN(Ma) || Ma < Ra ? Ra : Ma;
        }
        function ja(Ra, Ma, Aa, Ja) {
          var Ia;
          var Pa = new DOMParser();
          Ja = Pa.parseFromString(Ja, 'text/xml');
          Array.prototype.slice
            .call(Ja.getElementsByTagName('BBox'))
            .forEach(function (Fa) {
              if ('CropBox' === Fa.getAttribute('Name')) {
                var Ea = parseFloat(
                    Fa.getElementsByTagName('Top').item(0).innerHTML
                  ),
                  Ua = parseFloat(
                    Fa.getElementsByTagName('Bottom').item(0).innerHTML
                  ),
                  Va = parseFloat(
                    Fa.getElementsByTagName('Left').item(0).innerHTML
                  );
                Fa = parseFloat(
                  Fa.getElementsByTagName('Right').item(0).innerHTML
                );
                Ia = new y(Ea, Va, Ua, Fa);
              }
            });
          Pa = new DOMParser();
          Ja = Pa.parseFromString(Ma, 'text/xml');
          var Wa = [];
          Array.prototype.slice
            .call(Ja.getElementsByTagName('STORY'))
            .forEach(function (Fa) {
              var Ea = Fa.getAttribute('galley_ids'),
                Ua = Array.prototype.slice.call(
                  Fa.getElementsByTagName('g')
                )[0],
                Va = Ua.getAttribute('bbox').split(' ');
              Va = new y(
                parseFloat(Va[0]),
                parseFloat(Va[1]),
                parseFloat(Va[2]),
                parseFloat(Va[3])
              );
              Ua = Ua.innerHTML;
              var Xa = Array.prototype.slice.call(
                Fa.getElementsByTagName('galleys')
              )[0];
              Xa.parentNode.removeChild(Xa);
              Fa = Fa.innerHTML;
              Fa = new DOMParser()
                .parseFromString(Fa, 'text/html')
                .documentElement.querySelector('body')
                .innerHTML.trim();
              Ea = new f(Ea, Ra, Ua, Fa, Va);
              Wa.push(Ea);
            });
          Pa = new DOMParser();
          var Qa = [];
          Ma = Pa.parseFromString(Aa, 'text/xml').getElementsByTagName(
            'Object'
          );
          Array.prototype.slice.call(Ma).forEach(function (Fa) {
            var Ea = Fa.getAttribute('Type'),
              Ua = Fa.getAttribute('OID');
            Fa = Array.prototype.slice.call(Fa.getElementsByTagName('Point'));
            var Va = Number.NaN,
              Xa = Number.NaN,
              cb = Number.NaN,
              eb = Number.NaN;
            Fa.forEach(function (hb) {
              var kb = hb.getAttribute('Name');
              'TL' === kb
                ? ((Va = ea(hb.getAttribute('Y'), Va)),
                  (cb = ea(hb.getAttribute('X'), cb)))
                : 'TR' === kb
                ? ((Va = ea(hb.getAttribute('Y'), Va)),
                  (eb = ea(hb.getAttribute('X'), eb)))
                : 'BR' === kb
                ? ((Xa = ea(hb.getAttribute('Y'), Xa)),
                  (eb = ea(hb.getAttribute('X'), eb)))
                : 'BL' === kb &&
                  ((Xa = ea(hb.getAttribute('Y'), Xa)),
                  (cb = ea(hb.getAttribute('X'), cb)));
            });
            Fa = new y(Va, cb, Xa, eb);
            Ea = new e(Ea, Ua, Fa, Ra);
            Qa.push(Ea);
          });
          Ma = Array.prototype.slice
            .call(Ja.getElementsByTagName('DOC'))[0]
            .getAttribute('id');
          return new a(Ma, 1, Ia, Wa, Qa);
        }
        function aa(Ra, Ma) {
          var Aa;
          Ma = new TextDecoder('utf-8').decode(Ma);
          var Ja = new DOMParser().parseFromString(Ma, 'text/xml');
          Ma = Ja.getElementsByTagName('Galley').item(0);
          if (null != Ma) {
            var Ia = Ma.getAttribute('id');
            Ma = Ja.getElementsByTagName('BBox');
            Ma = Array.prototype.slice.call(Ma);
            Ma.forEach(function (Qa) {
              var Fa = Qa.getElementsByTagName('Top'),
                Ea = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Left');
              var Ua = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Bottom');
              var Va = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Right');
              Qa = parseFloat(Fa.item(0).innerHTML);
              Aa = new y(Ea, Ua, Va, Qa);
            });
            Ha[Ra].forEach(function (Qa) {
              Qa.id === Ia && !0 === Aa.MQ(Qa.galleyBox) && (Qa.galleyBox = Aa);
            });
          }
          Ma = Ja.getElementsByTagName('Object').item(0);
          if (null != Ma) {
            var Pa = Ma.getAttribute('OID');
            Ma = Ja.getElementsByTagName('BBox');
            Ma = Array.prototype.slice.call(Ma);
            Ma.forEach(function (Qa) {
              var Fa = Qa.getElementsByTagName('Top'),
                Ea = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Left');
              var Ua = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Bottom');
              var Va = parseFloat(Fa.item(0).innerHTML);
              Fa = Qa.getElementsByTagName('Right');
              Qa = parseFloat(Fa.item(0).innerHTML);
              Aa = new y(Ea, Ua, Va, Qa);
            });
            La[Ra].forEach(function (Qa) {
              Qa.id === Pa && !0 === Aa.MQ(Qa.bbox) && (Qa.bbox = Aa);
            });
          }
          Ma = Ja.getElementsByTagName('NewParas').item(0);
          if (null != Ma) {
            var Wa = Ma.getAttribute('id');
            Ha[Ra].forEach(function (Qa) {
              if (Qa.id === Wa) {
                var Fa = '<Contents>' + Qa.contents;
                Fa += '</Contents>';
                var Ea = Array.prototype.slice.call(
                  Ja.getElementsByTagName('NewPara')
                );
                Fa = new DOMParser().parseFromString(Fa, 'text/xml');
                var Ua = Array.prototype.slice.call(
                  Fa.getElementsByTagName('p')
                );
                Ea.forEach(function (Va) {
                  var Xa = parseFloat(Va.innerHTML),
                    cb = !1;
                  Ua.forEach(function (eb) {
                    var hb = eb.getAttribute('id');
                    !1 === cb &&
                      '0' === hb &&
                      (eb.setAttribute('id', Xa), (cb = !0));
                  });
                });
                Qa.contents =
                  Fa.getElementsByTagName('Contents').item(0).innerHTML;
              }
            });
          }
        }
        r.r(ua);
        var ca = r(1),
          ia = r(55),
          ha = r(8),
          la = r(474),
          na = r(37),
          qa = r(76),
          ra = r(2),
          ta = r(174),
          va = r(118),
          oa = r(6),
          wa = null,
          Da = null,
          Ha = {},
          La = {},
          Ca = {},
          Ka;
        ua['default'] = {
          Xfa: function (Ra) {
            return Object(ca.b)(void 0, void 0, void 0, function () {
              return Object(ca.d)(this, function () {
                Da ||
                  ((Ka = Ra),
                  (Da = new Promise(function (Ma, Aa) {
                    wa = new Worker(
                      window.Core.getWorkerPath() +
                        'contentEdit/InfixServerModule.js'
                    );
                    wa.onmessage = function (Ja) {
                      n(Ja, Ma, Aa);
                    };
                    wa.postMessage({ cmd: 'isReady' });
                  })));
                return [2, Da];
              });
            });
          },
          Zfa: function (Ra, Ma, Aa) {
            return Object(ca.b)(void 0, void 0, void 0, function () {
              var Ja, Ia, Pa, Wa;
              return Object(ca.d)(this, function (Qa) {
                switch (Qa.label) {
                  case 0:
                    return (
                      fa(Ma), (Ha[Ma] = []), (La[Ma] = []), [4, Ra.Be([Ma])]
                    );
                  case 1:
                    return (
                      (Ja = Qa.ea()),
                      (Ia = new TextEncoder()),
                      (Pa = Ia.encode('')),
                      (Wa = Pa.buffer),
                      wa.postMessage(
                        {
                          cmd: 'exportFile',
                          pageNumber: Ma,
                          performExport: Aa,
                          pdfFile: Ja,
                          tableData: Wa,
                        },
                        [Ja, Wa]
                      ),
                      [2]
                    );
                }
              });
            });
          },
          U6: function (Ra) {
            return Object(ca.b)(void 0, void 0, void 0, function () {
              var Ma, Aa, Ja, Ia, Pa, Wa, Qa, Fa;
              return Object(ca.d)(this, function (Ea) {
                switch (Ea.label) {
                  case 0:
                    return (
                      (Ma = Ra.id),
                      (Aa = Ra.isText),
                      (Ja = Ra.pageNumber),
                      (Ia = Ka.getDocument()),
                      [4, Ia.Be([Ja])]
                    );
                  case 1:
                    return (
                      (Pa = Ea.ea()),
                      (Wa = new TextEncoder()),
                      (Qa = Wa.encode('')),
                      (Fa = Qa.buffer),
                      wa.postMessage(
                        {
                          cmd: 'deleteObject',
                          pdfFile: Pa,
                          pageNumber: Ja,
                          objectID: Ma,
                          isText: Aa,
                          tableData: Fa,
                        },
                        [Fa]
                      ),
                      [2]
                    );
                }
              });
            });
          },
          hla: function (Ra) {
            return Object(ca.b)(void 0, void 0, void 0, function () {
              var Ma, Aa, Ja, Ia, Pa, Wa, Qa, Fa, Ea, Ua, Va, Xa, cb;
              return Object(ca.d)(this, function (eb) {
                switch (eb.label) {
                  case 0:
                    return (
                      (Ma = Ra.id),
                      (Aa = Ra.position),
                      (Ja = Aa.top),
                      (Ia = Aa.left),
                      (Pa = Aa.bottom),
                      (Wa = Aa.right),
                      (Qa = Ra.isText),
                      (Fa = Ra.pageNumber),
                      (Ea = Ka.getDocument()),
                      [4, Ea.Be([Fa])]
                    );
                  case 1:
                    return (
                      (Ua = eb.ea()),
                      (Va = new TextEncoder()),
                      (Xa = Va.encode('')),
                      (cb = Xa.buffer),
                      wa.postMessage(
                        {
                          cmd: 'transformObject',
                          pdfFile: Ua,
                          pageNumber: Fa,
                          objectID: Ma,
                          isText: Qa,
                          topVal: Ja,
                          leftVal: Ia,
                          bottomVal: Pa,
                          rightVal: Wa,
                          tableData: cb,
                        },
                        [cb]
                      ),
                      [2]
                    );
                }
              });
            });
          },
          zla: function (Ra, Ma) {
            return Object(ca.b)(void 0, void 0, void 0, function () {
              var Aa,
                Ja,
                Ia,
                Pa,
                Wa,
                Qa,
                Fa,
                Ea,
                Ua,
                Va,
                Xa,
                cb,
                eb,
                hb,
                kb,
                sb,
                pb,
                tb;
              return Object(ca.d)(this, function (Db) {
                switch (Db.label) {
                  case 0:
                    Aa = Ma.replaceAll('<p><br></p>', '');
                    Ja = x(Aa);
                    Ja = Ja.replace(
                      /<span style="color: var\(--text-color\);">(.*?)<\/span>/g,
                      '$1'
                    );
                    Ia = Ra.Du.id;
                    Pa = Ra.PageNumber;
                    Wa = Ca[Pa];
                    Qa = Wa.galleys.find(function (Ab) {
                      return Ab.id === Ia;
                    });
                    Fa = ka(Qa.contents);
                    Ea = b(Pa, Wa, Fa, Ja, Ia);
                    if ('' === Ea) return [3, 2];
                    Ua = new TextEncoder();
                    Va = Ua.encode(Ea);
                    Xa = Va.buffer;
                    cb =
                      Object(na.c)() || 'https://www.pdftron.com/webfonts/v2/';
                    eb = Ka.getDocument();
                    return [4, eb.Be([Pa])];
                  case 1:
                    return (
                      (hb = Db.ea()),
                      (Ua = new TextEncoder()),
                      (kb = Ua.encode('')),
                      (sb = kb.buffer),
                      wa.postMessage(
                        {
                          cmd: 'importText',
                          pdfFile: hb,
                          pageNumber: Pa,
                          webFontURL: cb,
                          galleyId: Ia,
                          importData: Xa,
                          tableData: sb,
                        },
                        [Xa, sb]
                      ),
                      (pb = {}),
                      Qa &&
                        ((tb = Qa.galleyBox),
                        (pb = {
                          top: tb.top,
                          left: tb.left,
                          bottom: tb.bottom,
                          right: tb.right,
                        })),
                      Object(va.h)(Fa, Ja, pb),
                      [3, 3]
                    );
                  case 2:
                    Object(ra.g)('Unable to generate import XML'),
                      (Db.label = 3);
                  case 3:
                    return [2];
                }
              });
            });
          },
          iaa: function (Ra) {
            if (Ra) return ka(Ra.contents);
            Object(ra.g)('Unable to extract document content');
          },
        };
      },
      474: function (Ba, ua, r) {
        var pa = r(1);
        Ba = r(83);
        var ka = r(48);
        r = (function (ma) {
          function fa() {
            return (null !== ma && ma.apply(this, arguments)) || this;
          }
          Object(pa.c)(fa, ma);
          fa.prototype.testSelection = function (da, z, x) {
            return ka.a.al(da, z, x);
          };
          return fa;
        })(Ba.a);
        ua.a = r;
      },
    },
  ]);
}.call(this || window));
