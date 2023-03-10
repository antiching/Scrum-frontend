/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function () {
  (window.wpCoreControlsBundle = window.wpCoreControlsBundle || []).push([
    [10],
    {
      435: function (Ba, ua, r) {
        r.r(ua);
        var pa = r(1),
          ka = r(2),
          ma = r(147);
        Ba = r(94);
        var fa = r(246);
        r = r(375);
        var da = window;
        Ba = (function (z) {
          function x(y, f, e) {
            f = z.call(this, y, f, e) || this;
            if (y.name && 'xod' !== y.name.toLowerCase().split('.').pop())
              throw Error('Not an XOD file');
            if (!da.FileReader || !da.File || !da.Blob)
              throw Error('File API is not supported in this browser');
            f.file = y;
            f.cB = [];
            f.EH = 0;
            return f;
          }
          Object(pa.c)(x, z);
          x.prototype.oK = function (y, f, e) {
            var a = this,
              b = new FileReader();
            b.onloadend = function (h) {
              if (0 < a.cB.length) {
                var n = a.cB.shift();
                n.Hga.readAsBinaryString(n.file);
              } else a.EH--;
              if (b.error) {
                h = b.error;
                if (h.code === h.ABORT_ERR) {
                  Object(ka.j)(
                    'Request for chunk ' +
                      f.start +
                      '-' +
                      f.stop +
                      ' was aborted'
                  );
                  return;
                }
                return e(h);
              }
              if ((h = b.content || h.target.result)) return e(!1, h);
              Object(ka.j)('No data was returned from FileReader.');
            };
            f &&
              (y = (y.slice || y.webkitSlice || y.mozSlice || y.boa).call(
                y,
                f.start,
                f.stop
              ));
            0 === a.cB.length && 50 > a.EH
              ? (b.readAsBinaryString(y), a.EH++)
              : a.cB.push({ Hga: b, file: y });
            return function () {
              b.abort();
            };
          };
          x.prototype.bt = function (y) {
            var f = this;
            f.ZA = !0;
            var e = ma.a;
            f.oK(f.file, { start: -e, stop: f.file.size }, function (a, b) {
              if (a)
                return Object(ka.j)('Error loading end header: %s ' + a), y(a);
              if (b.length !== e)
                throw Error('Zip end header data is wrong size!');
              f.Xd = new fa.a(b);
              var h = f.Xd.WS();
              f.oK(f.file, h, function (n, ba) {
                if (n)
                  return (
                    Object(ka.j)('Error loading central directory: %s ' + n),
                    y(n)
                  );
                if (ba.length !== h.stop - h.start)
                  throw Error('Zip central directory data is wrong size!');
                f.Xd.QW(ba);
                f.rH = !0;
                f.ZA = !1;
                return y(!1);
              });
            });
          };
          x.prototype.lL = function (y, f) {
            var e = this,
              a = e.Th[y];
            if (e.Xd.mR(y)) {
              var b = e.Xd.kw(y),
                h = e.oK(e.file, b, function (n, ba) {
                  delete e.Th[y];
                  if (n)
                    return (
                      Object(ka.j)(
                        'Error loading part "%s": %s, ' + y + ', ' + n
                      ),
                      f(n)
                    );
                  if (ba.length !== b.stop - b.start)
                    throw Error('Part data is wrong size!');
                  f(!1, y, ba, e.Xd.wU(y));
                });
              a.$Y = !0;
              a.cancel = h;
            } else f(Error('File not found: "' + y + '"'), y);
          };
          return x;
        })(Ba.a);
        Object(r.a)(Ba);
        Object(r.b)(Ba);
        ua['default'] = Ba;
      },
    },
  ]);
}.call(this || window));
