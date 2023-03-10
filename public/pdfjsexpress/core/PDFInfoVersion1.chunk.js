/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [12],
    {
      447: function (Ba, ua, r) {
        function pa(ca) {
          ca.Ga();
          ca.advance();
          var ia = ca.current.textContent;
          ca.Va();
          return ia;
        }
        function ka(ca) {
          var ia = [];
          for (ca.Ga(); ca.advance(); ) {
            var ha = ca.Ka();
            'field' === ha
              ? ia.push(String(ca.fa('name')))
              : Object(b.j)('unrecognised field list element: ' + ha);
          }
          ca.Va();
          return ia;
        }
        function ma(ca, ia) {
          return ia ? 'false' !== ca : 'true' === ca;
        }
        function fa(ca, ia) {
          var ha = ca.Ka();
          switch (ha) {
            case 'javascript':
              return { name: 'JavaScript', javascript: ca.current.textContent };
            case 'uri':
              return { name: 'URI', uri: ca.fa('uri') };
            case 'goto':
              ha = null;
              ca.Ga();
              if (ca.advance()) {
                var la = ca.fa('fit');
                ha = { page: ca.fa('page'), fit: la };
                if ('0' === ha.page)
                  Object(b.j)('null page encountered in dest');
                else
                  switch (((ia = ia(Number(ha.page))), la)) {
                    case 'Fit':
                    case 'FitB':
                      break;
                    case 'FitH':
                    case 'FitBH':
                      ha.top = ia.na({ x: 0, y: ca.fa('top') || 0 }).y;
                      break;
                    case 'FitV':
                    case 'FitBV':
                      ha.left = ia.na({ x: ca.fa('left') || 0, y: 0 }).x;
                      break;
                    case 'FitR':
                      la = ia.na({
                        x: ca.fa('left') || 0,
                        y: ca.fa('top') || 0,
                      });
                      ia = ia.na({
                        x: ca.fa('right') || 0,
                        y: ca.fa('bottom') || 0,
                      });
                      ia = new ba.d(la.x, la.y, ia.x, ia.y);
                      ha.top = ia.y1;
                      ha.left = ia.x1;
                      ha.bottom = ia.y2;
                      ha.right = ia.x2;
                      break;
                    case 'XYZ':
                      la = ia.na({
                        x: ca.fa('left') || 0,
                        y: ca.fa('top') || 0,
                      });
                      ha.top = la.y;
                      ha.left = la.x;
                      ha.zoom = ca.fa('zoom') || 0;
                      break;
                    default:
                      Object(b.j)('unknown dest fit: ' + la);
                  }
                ha = { name: 'GoTo', dest: ha };
              } else Object(b.j)('missing dest in GoTo action');
              ca.Va();
              return ha;
            case 'submit-form':
              ha = {
                name: 'SubmitForm',
                url: ca.fa('url'),
                format: ca.fa('format'),
                method: ca.fa('method') || 'POST',
                exclude: ma(ca.fa('exclude'), !1),
              };
              ia = ca.fa('flags');
              ha.flags = ia ? ia.split(' ') : [];
              for (ca.Ga(); ca.advance(); )
                switch (((ia = ca.Ka()), ia)) {
                  case 'fields':
                    ha.fields = ka(ca);
                    break;
                  default:
                    Object(b.j)('unrecognised submit-form child: ' + ia);
                }
              ca.Va();
              return ha;
            case 'reset-form':
              ha = { name: 'ResetForm', exclude: ma(ca.fa('exclude'), !1) };
              for (ca.Ga(); ca.advance(); )
                switch (((ia = ca.Ka()), ia)) {
                  case 'fields':
                    ha.fields = ka(ca);
                    break;
                  default:
                    Object(b.j)('unrecognised reset-form child: ' + ia);
                }
              ca.Va();
              return ha;
            case 'hide':
              ha = { name: 'Hide', hide: ma(ca.fa('hide'), !0) };
              for (ca.Ga(); ca.advance(); )
                switch (((ia = ca.Ka()), ia)) {
                  case 'fields':
                    ha.fields = ka(ca);
                    break;
                  default:
                    Object(b.j)('unrecognised hide child: ' + ia);
                }
              ca.Va();
              return ha;
            case 'named':
              return { name: 'Named', action: ca.fa('name') };
            default:
              Object(b.j)('Encountered unexpected action type: ' + ha);
          }
          return null;
        }
        function da(ca, ia, ha) {
          var la = {};
          for (ca.Ga(); ca.advance(); ) {
            var na = ca.Ka();
            switch (na) {
              case 'action':
                na = ca.fa('trigger');
                if (ia ? -1 !== ia.indexOf(na) : 1) {
                  la[na] = [];
                  for (ca.Ga(); ca.advance(); ) {
                    var qa = fa(ca, ha);
                    Object(h.isNull)(qa) || la[na].push(qa);
                  }
                  ca.Va();
                } else
                  Object(b.j)('encountered unexpected trigger on field: ' + na);
                break;
              default:
                Object(b.j)('encountered unknown action child: ' + na);
            }
          }
          ca.Va();
          return la;
        }
        function z(ca) {
          return new w.a(
            ca.fa('r') || 0,
            ca.fa('g') || 0,
            ca.fa('b') || 0,
            ca.fa('a') || 1
          );
        }
        function x(ca, ia) {
          var ha = ca.fa('name'),
            la = ca.fa('type') || 'Type1',
            na = ca.fa('size'),
            qa = ia.na({ x: 0, y: 0 });
          na = ia.na({ x: Number(na), y: 0 });
          ia = qa.x - na.x;
          qa = qa.y - na.y;
          ha = {
            name: ha,
            type: la,
            size: Math.sqrt(ia * ia + qa * qa) || 0,
            strokeColor: [0, 0, 0],
            fillColor: [0, 0, 0],
          };
          for (ca.Ga(); ca.advance(); )
            switch (((la = ca.Ka()), la)) {
              case 'stroke-color':
                ha.strokeColor = z(ca);
                break;
              case 'fill-color':
                ha.fillColor = z(ca);
                break;
              default:
                Object(b.j)('unrecognised font child: ' + la);
            }
          ca.Va();
          return ha;
        }
        function y(ca) {
          var ia = [];
          for (ca.Ga(); ca.advance(); ) {
            var ha = ca.Ka();
            switch (ha) {
              case 'option':
                ha = ia;
                var la = ha.push;
                var na = ca;
                na = {
                  value: na.fa('value'),
                  displayValue: na.fa('display-value') || void 0,
                };
                la.call(ha, na);
                break;
              default:
                Object(b.j)('unrecognised options child: ' + ha);
            }
          }
          ca.Va();
          return ia;
        }
        function f(ca, ia) {
          var ha = ca.fa('name'),
            la = {
              type: ca.fa('type'),
              quadding: ca.fa('quadding') || 'Left-justified',
              maxLen: ca.fa('max-len') || -1,
            },
            na = ca.fa('flags');
          Object(h.isString)(na) && (la.flags = na.split(' '));
          for (ca.Ga(); ca.advance(); )
            switch (((na = ca.Ka()), na)) {
              case 'actions':
                la.actions = da(ca, ['C', 'F', 'K', 'V'], function () {
                  return ia;
                });
                break;
              case 'default-value':
                la.defaultValue = pa(ca);
                break;
              case 'font':
                la.font = x(ca, ia);
                break;
              case 'options':
                la.options = y(ca);
                break;
              default:
                Object(b.j)('unknown field child: ' + na);
            }
          ca.Va();
          return new window.Annotations.ha.ra(ha, la);
        }
        function e(ca, ia) {
          switch (ca.type) {
            case 'Tx':
              try {
                if (Object(ja.c)(ca.actions))
                  return new n.a.DatePickerWidgetAnnotation(ca, ia);
              } catch (ha) {
                Object(b.j)(ha);
              }
              return new n.a.TextWidgetAnnotation(ca, ia);
            case 'Ch':
              return ca.flags.get(aa.WidgetFlags.COMBO)
                ? new n.a.ChoiceWidgetAnnotation(ca, ia)
                : new n.a.ListWidgetAnnotation(ca, ia);
            case 'Btn':
              return ca.flags.get(aa.WidgetFlags.PUSH_BUTTON)
                ? new n.a.PushButtonWidgetAnnotation(ca, ia)
                : ca.flags.get(aa.WidgetFlags.RADIO)
                ? new n.a.RadioButtonWidgetAnnotation(ca, ia)
                : new n.a.CheckButtonWidgetAnnotation(ca, ia);
            case 'Sig':
              return new n.a.SignatureWidgetAnnotation(ca, ia);
            default:
              Object(b.j)('Unrecognised field type: ' + ca.type);
          }
          return null;
        }
        function a(ca, ia, ha, la) {
          var na = [],
            qa = {};
          ca.Ga();
          var ra = [],
            ta = {},
            va = [];
          Object(ea.a)(
            function () {
              if (ca.advance()) {
                var oa = ca.Ka();
                switch (oa) {
                  case 'calculation-order':
                    ra = 'calculation-order' === ca.Ka() ? ka(ca) : [];
                    break;
                  case 'document-actions':
                    ta = da(ca, ['Init', 'Open'], ia);
                    break;
                  case 'pages':
                    oa = [];
                    for (ca.Ga(); ca.advance(); ) {
                      var wa = ca.Ka();
                      switch (wa) {
                        case 'page':
                          wa = oa;
                          var Da = wa.push,
                            Ha = ca,
                            La = ia,
                            Ca = { number: Ha.fa('number') };
                          for (Ha.Ga(); Ha.advance(); ) {
                            var Ka = Ha.Ka();
                            switch (Ka) {
                              case 'actions':
                                Ca.actions = da(Ha, ['O', 'C'], La);
                                break;
                              default:
                                Object(b.j)('unrecognised page child: ' + Ka);
                            }
                          }
                          Ha.Va();
                          Da.call(wa, Ca);
                          break;
                        default:
                          Object(b.j)('unrecognised page child: ' + wa);
                      }
                    }
                    ca.Va();
                    va = oa;
                    break;
                  case 'field':
                    wa = f(ca, ia(1));
                    qa[wa.name] = wa;
                    break;
                  case 'widget':
                    oa = {
                      border: { style: 'Solid', width: 1 },
                      backgroundColor: [],
                      fieldName: ca.fa('field'),
                      page: ca.fa('page'),
                      index: ca.fa('index') || 0,
                      rotation: ca.fa('rotation') || 0,
                      flags: [],
                      isImporting: !0,
                    };
                    (wa = ca.fa('appearance')) && (oa.appearance = wa);
                    (wa = ca.fa('flags')) && (oa.flags = wa.split(' '));
                    for (ca.Ga(); ca.advance(); )
                      switch (((wa = ca.Ka()), wa)) {
                        case 'rect':
                          Da = ca;
                          Ha = ia(Number(oa.page));
                          wa = Ha.na({
                            x: Da.fa('x1') || 0,
                            y: Da.fa('y1') || 0,
                          });
                          Da = Ha.na({
                            x: Da.fa('x2') || 0,
                            y: Da.fa('y2') || 0,
                          });
                          wa = new ba.d(wa.x, wa.y, Da.x, Da.y);
                          wa.normalize();
                          oa.rect = {
                            x1: wa.x1,
                            y1: wa.y1,
                            x2: wa.x2,
                            y2: wa.y2,
                          };
                          break;
                        case 'border':
                          wa = ca;
                          Da = {
                            style: wa.fa('style') || 'Solid',
                            width: wa.fa('width') || 1,
                            color: [0, 0, 0],
                          };
                          for (wa.Ga(); wa.advance(); )
                            switch (((Ha = wa.Ka()), Ha)) {
                              case 'color':
                                Da.color = z(wa);
                                break;
                              default:
                                Object(b.j)('unrecognised border child: ' + Ha);
                            }
                          wa.Va();
                          oa.border = Da;
                          break;
                        case 'background-color':
                          oa.backgroundColor = z(ca);
                          break;
                        case 'actions':
                          oa.actions = da(
                            ca,
                            'E X D U Fo Bl PO PC PV PI'.split(' '),
                            ia
                          );
                          break;
                        case 'appearances':
                          wa = ca;
                          Da = Object(ja.b)(oa, 'appearances');
                          for (wa.Ga(); wa.advance(); )
                            if (((Ha = wa.Ka()), 'appearance' === Ha)) {
                              Ha = wa.fa('name');
                              La = Object(ja.b)(Da, Ha);
                              Ha = wa;
                              for (Ha.Ga(); Ha.advance(); )
                                switch (((Ca = Ha.Ka()), Ca)) {
                                  case 'Normal':
                                    Object(ja.b)(La, 'Normal').data =
                                      Ha.current.textContent;
                                    break;
                                  default:
                                    Object(b.j)(
                                      'unexpected appearance state: ',
                                      Ca
                                    );
                                }
                              Ha.Va();
                            } else
                              Object(b.j)(
                                'unexpected appearances child: ' + Ha
                              );
                          wa.Va();
                          break;
                        case 'extra':
                          wa = ca;
                          Da = ia;
                          Ha = {};
                          for (wa.Ga(); wa.advance(); )
                            switch (((La = wa.Ka()), La)) {
                              case 'font':
                                Ha.font = x(wa, Da(1));
                                break;
                              default:
                                Object(b.j)('unrecognised extra child: ' + La);
                            }
                          wa.Va();
                          wa = Ha;
                          wa.font && (oa.font = wa.font);
                          break;
                        case 'captions':
                          Da = ca;
                          wa = {};
                          (Ha = Da.fa('Normal')) && (wa.Normal = Ha);
                          (Ha = Da.fa('Rollover')) && (wa.Rollover = Ha);
                          (Da = Da.fa('Down')) && (wa.Down = Da);
                          oa.captions = wa;
                          break;
                        default:
                          Object(b.j)('unrecognised widget child: ' + wa);
                      }
                    ca.Va();
                    (wa = qa[oa.fieldName])
                      ? ((oa = e(wa, oa)), na.push(oa))
                      : Object(b.j)(
                          'ignoring widget with no corresponding field data: ' +
                            oa.fieldName
                        );
                    break;
                  default:
                    Object(b.j)(
                      'Unknown element encountered in PDFInfo: ' + oa
                    );
                }
                return !0;
              }
              return !1;
            },
            function () {
              ca.Va();
              ha({
                calculationOrder: ra,
                widgets: na,
                fields: qa,
                documentActions: ta,
                pages: va,
                custom: [],
              });
            },
            la
          );
        }
        r.r(ua);
        r.d(ua, 'parse', function () {
          return a;
        });
        var b = r(2),
          h = r(0);
        r.n(h);
        var n = r(117),
          ba = r(4),
          w = r(8),
          ea = r(19),
          ja = r(102),
          aa = r(25);
      },
    },
  ]);
}.call(this || window));
