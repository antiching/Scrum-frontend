/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [23],
    {
      451: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(10),
          ma = r(2);
        Ba = r(51);
        var fa = r(34),
          da = r(11);
        r = (function () {
          function z() {
            this.init();
          }
          z.prototype.init = function () {
            this.S5 = !1;
            this.Ne = this.cl = this.connection = null;
            this.Lr = {};
            this.ja = this.$E = null;
          };
          z.prototype.tla = function (x) {
            for (var y = this, f = 0; f < x.length; ++f) {
              var e = x[f];
              switch (e.at) {
                case 'create':
                  this.Lr[e.author] || (this.Lr[e.author] = e.aName);
                  this.yca(e);
                  break;
                case 'modify':
                  this.ja.Hl(e.xfdf).then(function (a) {
                    y.ja.kb(a[0]);
                  });
                  break;
                case 'delete':
                  this.ja.Hl('<delete><id>' + e.aId + '</id></delete>');
              }
            }
          };
          z.prototype.yca = function (x) {
            var y = this;
            this.ja.Hl(x.xfdf).then(function (f) {
              f = f[0];
              f.authorId = x.author;
              y.ja.kb(f);
              y.ja.trigger(ka.b.UPDATE_ANNOTATION_PERMISSION, [f]);
            });
          };
          z.prototype.Zba = function (x, y, f) {
            this.cl && this.cl(x, y, f);
          };
          z.prototype.preloadAnnotations = function (x) {
            this.addEventListener(
              'webViewerServerAnnotationsEnabled',
              this.Zba.bind(this, x, 'add', { imported: !1 }),
              { once: !0 }
            );
          };
          z.prototype.initiateCollaboration = function (x, y, f) {
            var e = this;
            if (x) {
              e.Ne = y;
              e.ja = f.pa();
              f.addEventListener(ka.e.DOCUMENT_UNLOADED, function () {
                e.disableCollaboration();
              });
              e.Sla(x);
              var a = new XMLHttpRequest();
              a.addEventListener('load', function () {
                if (200 === a.status && 0 < a.responseText.length)
                  try {
                    var b = JSON.parse(a.responseText);
                    e.connection = exports.Sa.wma(
                      Object(fa.j)(e.Ne, 'blackbox/'),
                      'annot'
                    );
                    e.$E = b.id;
                    e.Lr[b.id] = b.user_name;
                    e.ja.VL(b.id);
                    e.connection.Cpa(
                      function (h) {
                        h.t && h.t.startsWith('a_') && h.data && e.tla(h.data);
                      },
                      function () {
                        e.connection.send({ t: 'a_retrieve', dId: x });
                        e.trigger(
                          z.Events.WEBVIEWER_SERVER_ANNOTATIONS_ENABLED,
                          [e.Lr[b.id], e.$E]
                        );
                      },
                      function () {
                        e.disableCollaboration();
                      }
                    );
                  } catch (h) {
                    Object(ma.g)(h.message);
                  }
              });
              a.open('GET', Object(fa.j)(this.Ne, 'demo/SessionInfo.jsp'));
              a.withCredentials = !0;
              a.send();
              e.S5 = !0;
              e.ja.fY(function (b) {
                return e.Lr[b.Author] || b.Author;
              });
            } else Object(ma.g)('Document ID required for collaboration');
          };
          z.prototype.disableCollaboration = function () {
            this.cl &&
              (this.ja.removeEventListener(
                da.a.Events.ANNOTATION_CHANGED,
                this.cl
              ),
              (this.cl = null));
            this.connection && this.connection.Cp();
            this.ja && this.ja.VL('Guest');
            this.init();
            this.trigger(z.Events.WEBVIEWER_SERVER_ANNOTATIONS_DISABLED);
          };
          z.prototype.Sla = function (x) {
            var y = this;
            this.cl &&
              this.ja.removeEventListener(
                da.a.Events.ANNOTATION_CHANGED,
                this.cl
              );
            this.cl = function (f, e, a) {
              return Object(pa.b)(this, void 0, void 0, function () {
                var b, h, n, ba, w, ea, ja, aa, ca;
                return Object(pa.d)(this, function (ia) {
                  switch (ia.label) {
                    case 0:
                      if (a.imported) return [2];
                      b = { t: 'a_' + e, dId: x, annots: [] };
                      return [4, y.ja.hI()];
                    case 1:
                      h = ia.ea();
                      'delete' !== e &&
                        ((n = new DOMParser().parseFromString(h, 'text/xml')),
                        (ba = new XMLSerializer()));
                      for (w = 0; w < f.length; w++)
                        (ea = f[w]),
                          (aa = ja = void 0),
                          'add' === e
                            ? ((ja = n.querySelector('[name="' + ea.Id + '"]')),
                              (aa = ba.serializeToString(ja)),
                              (ca = null),
                              ea.InReplyTo &&
                                (ca =
                                  y.ja.Xf(ea.InReplyTo).authorId || 'default'),
                              b.annots.push({
                                at: 'create',
                                aId: ea.Id,
                                author: y.$E,
                                aName: y.Lr[y.$E],
                                parent: ca,
                                xfdf: '<add>' + aa + '</add>',
                              }))
                            : 'modify' === e
                            ? ((ja = n.querySelector('[name="' + ea.Id + '"]')),
                              (aa = ba.serializeToString(ja)),
                              b.annots.push({
                                at: 'modify',
                                aId: ea.Id,
                                xfdf: '<modify>' + aa + '</modify>',
                              }))
                            : 'delete' === e &&
                              b.annots.push({ at: 'delete', aId: ea.Id });
                      0 < b.annots.length && y.connection.send(b);
                      return [2];
                  }
                });
              });
            }.bind(y);
            this.ja.addEventListener(da.a.Events.ANNOTATION_CHANGED, this.cl);
          };
          z.Events = {
            WEBVIEWER_SERVER_ANNOTATIONS_ENABLED:
              'webViewerServerAnnotationsEnabled',
            WEBVIEWER_SERVER_ANNOTATIONS_DISABLED:
              'webViewerServerAnnotationsDisabled',
          };
          return z;
        })();
        Object(Ba.a)(r);
        ua['default'] = r;
      },
    },
  ]);
}.call(this || window));
