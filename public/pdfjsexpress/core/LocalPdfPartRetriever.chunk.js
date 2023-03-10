/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [11],
    {
      436: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1);
        Ba = r(51);
        var ka = r(375),
          ma = r(229),
          fa = r(19),
          da = window;
        r = (function () {
          function z(x) {
            var y = this;
            this.fda = function (f) {
              return (
                f &&
                ('image' === f.type.split('/')[0].toLowerCase() ||
                  (f.name && !!f.name.match(/.(jpg|jpeg|png|gif)$/i)))
              );
            };
            this.file = x;
            this.sda = new Promise(function (f) {
              return Object(pa.b)(y, void 0, void 0, function () {
                var e;
                return Object(pa.d)(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return this.fda(this.file)
                        ? [4, Object(ma.b)(x)]
                        : [3, 2];
                    case 1:
                      (e = a.ea()),
                        (this.file = fa.p
                          ? new Blob([e], { type: x.type })
                          : new File(
                              [e],
                              null === x || void 0 === x ? void 0 : x.name,
                              { type: x.type }
                            )),
                        (a.label = 2);
                    case 2:
                      return f(!0), [2];
                  }
                });
              });
            });
          }
          z.prototype.getFileData = function (x) {
            var y = this,
              f = new FileReader();
            f.onload = function (e) {
              y.trigger(z.Events.DOCUMENT_LOADING_PROGRESS, [
                e.loaded,
                e.loaded,
              ]);
              x(new Uint8Array(e.target.result));
            };
            f.onprogress = function (e) {
              e.lengthComputable &&
                y.trigger(z.Events.DOCUMENT_LOADING_PROGRESS, [
                  e.loaded,
                  0 < e.total ? e.total : 0,
                ]);
            };
            f.readAsArrayBuffer(this.file);
          };
          z.prototype.getFile = function () {
            return Object(pa.b)(this, void 0, Promise, function () {
              return Object(pa.d)(this, function (x) {
                switch (x.label) {
                  case 0:
                    return [4, this.sda];
                  case 1:
                    return (
                      x.ea(),
                      da.utils.isJSWorker ? [2, this.file.path] : [2, this.file]
                    );
                }
              });
            });
          };
          z.Events = { DOCUMENT_LOADING_PROGRESS: 'documentLoadingProgress' };
          return z;
        })();
        Object(Ba.a)(r);
        Object(ka.a)(r);
        Object(ka.b)(r);
        ua['default'] = r;
      },
    },
  ]);
}.call(this || window));
