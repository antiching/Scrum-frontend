/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [5],
    {
      439: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(147);
        Ba = r(433);
        r = r(375);
        Ba = (function (ma) {
          function fa(da, z, x, y) {
            return ma.call(this, da, z, x, y) || this;
          }
          Object(pa.c)(fa, ma);
          fa.prototype.$S = function () {
            return { start: this.lS - ka.a, stop: this.lS };
          };
          fa.prototype.bt = function (da) {
            var z = this;
            this.ao(this.url, { start: 0, stop: 1 }, function (x, y, f) {
              if (x) return da(x);
              x = f.request.getResponseHeader('Content-Range');
              z.lS = x.split('/')[1];
              ma.prototype.bt.call(z, da);
            });
          };
          return fa;
        })(Ba['default']);
        Object(r.a)(Ba);
        Object(r.b)(Ba);
        ua['default'] = Ba;
      },
    },
  ]);
}.call(this || window));
