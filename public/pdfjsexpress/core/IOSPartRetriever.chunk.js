/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [9],
    {
      441: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(245);
        Ba = r(433);
        r(34);
        r = r(375);
        var ma = (function (fa) {
          function da(z, x) {
            var y = fa.call(this, z, x) || this;
            y.url = z;
            y.range = x;
            y.status = ka.a.NOT_STARTED;
            return y;
          }
          Object(pa.c)(da, fa);
          da.prototype.start = function () {
            var z = document.createElement('IFRAME');
            z.setAttribute('src', this.url);
            document.documentElement.appendChild(z);
            z.parentNode.removeChild(z);
            this.status = ka.a.STARTED;
            this.pC();
          };
          return da;
        })(Ba.ByteRangeRequest);
        Ba = (function (fa) {
          function da(z, x, y, f) {
            z = fa.call(this, z, x, y, f) || this;
            z.Kx = ma;
            return z;
          }
          Object(pa.c)(da, fa);
          da.prototype.Ev = function (z, x) {
            return z + '#' + x.start + '&' + (x.stop ? x.stop : '');
          };
          return da;
        })(Ba['default']);
        Object(r.a)(Ba);
        Object(r.b)(Ba);
        ua['default'] = Ba;
      },
    },
  ]);
}.call(this || window));
