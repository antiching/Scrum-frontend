/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [4],
    {
      438: function (Ba, ua, r) {
        r.r(ua);
        Ba = r(51);
        r = r(375);
        var pa = (function () {
          function ka(ma) {
            this.buffer = ma;
            this.fileSize =
              null === ma || void 0 === ma ? void 0 : ma.byteLength;
          }
          ka.prototype.getFileData = function (ma) {
            ma(new Uint8Array(this.buffer));
          };
          ka.prototype.getFile = function () {
            return Promise.resolve(null);
          };
          return ka;
        })();
        Object(Ba.a)(pa);
        Object(r.a)(pa);
        Object(r.b)(pa);
        ua['default'] = pa;
      },
    },
  ]);
}.call(this || window));
