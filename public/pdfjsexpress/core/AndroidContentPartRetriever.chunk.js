/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [3],
    {
      437: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(245);
        Ba = r(433);
        r = r(375);
        var ma = window,
          fa = (function (da) {
            function z(x, y) {
              var f = da.call(this, x, y) || this;
              f.url = x;
              f.range = y;
              f.request = new XMLHttpRequest();
              f.request.open('GET', f.url, !0);
              ma.Uint8Array && (f.request.responseType = 'arraybuffer');
              f.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
              f.status = ka.a.NOT_STARTED;
              return f;
            }
            Object(pa.c)(z, da);
            return z;
          })(Ba.ByteRangeRequest);
        Ba = (function (da) {
          function z(x, y, f, e) {
            x = da.call(this, x, y, f, e) || this;
            x.Kx = fa;
            return x;
          }
          Object(pa.c)(z, da);
          z.prototype.Ev = function (x, y) {
            return x + '/bytes=' + y.start + ',' + (y.stop ? y.stop : '');
          };
          return z;
        })(Ba['default']);
        Object(r.a)(Ba);
        Object(r.b)(Ba);
        ua['default'] = Ba;
      },
    },
  ]);
}.call(this || window));
