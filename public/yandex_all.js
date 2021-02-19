window.Ya || (window.Ya = {}), Ya.URL || (Ya.URL = function(e, t) {
		var a, r, i, n, s, o = e.location;

		function c() {
			var e = l();
			e !== n && ("function" == typeof a && a(n), n = e), r = setTimeout(c, s)
		}

		function l() {
			return o.hash.substr(1)
		}
		return {
			parseQuery: function(e, t, a) {
				var r, i, n, s, o, c, l = {};
				if(!e) return l;
				for(t = t || "&", a = a || "=", o = 0, c = (r = e.split(t)).length; o < c; ++o) {
					i = r[o].split(a);
					try {
						n = void 0 !== i[1] ? decodeURIComponent(i[1]) : "", s = decodeURIComponent(i[0]), l.hasOwnProperty(s) ? Array.isArray(l[s]) ? l[s].push(n) : l[s] = [l[s], n] : l[s] = n
					} catch(e) {}
				}
				return l
			},
			buildQuery: function(e, t, a) {
				var r, i, n, s, o, c, l = "";
				if(!e) return l;
				for(c in t = t || "&", a = a || "=", e)
					if(e.hasOwnProperty(c))
						for(s = 0, o = (n = [].concat(e[c])).length; s < o; ++s) r = "object" == (i = typeof n[s]) || "undefined" == i ? "" : encodeURIComponent(n[s]), l += t + encodeURIComponent(c) + a + r;
				return l.substr(t.length)
			},
			removeQueryParams: function(e, t) {
				var a = t.join("|"),
					r = new RegExp("(" + a + ")(=[^&]*)(&|$)", "g");
				return t.length && (e = e.replace(r, "")), e.replace(/&(?=&|$)/g, "")
			},
			onHashChange: (i = "onhashchange" in t, n = l(), s = 100, function(e) {
				i ? t.onhashchange = function() {
					e(n), n = l()
				} : (a = e, r || c())
			}),
			setHash: function(e, t) {
				t ? o.replace(o.pathname + o.search + "#" + e) : o.hash = "#" + e
			},
			getHash: l
		}
	}(document, window)), window.Ya || (window.Ya = {}), Ya.Site || (Ya.Site = function(o, n) {
		var r, i = "1.4.0",
			s = "1.6.2",
			t = "2.0",
			c = "initial",
			l = [],
			e = o.location,
			u = n.jQuery,
			a = "https:",
			d = [],
			p = !1;
		"CSS1Compat" !== o.compatMode && (o.documentElement.className += " ya-page_css_quirks");
		var h = {
			staticHost: a + "//site.yandex.net/",
			serp: a + "//yandex.%tld%/search/site/",
			suggest_ru: "https://sitesearch-suggest.yandex.ru/v1/suggest?",
			suggest_com: "https://sitesearch-suggest.yandex.com/v1/suggest?",
			jquery: a + "//yastatic.net/jquery/1.6.2/jquery.min.js",
			serpStatic: a + "//yastatic.net/sitesearch2/0xcd62cb1/pages/",
			opensearch: "https://yandex.%tld%/search/site/opensearch.xml?"
		};
		if(n.ya_site_path)
			for(var m in ya_site_path) ya_site_path.hasOwnProperty(m) && (h[m] = "http" === ya_site_path[m].substr(0, 4) ? ya_site_path[m] : a + ya_site_path[m]);

		function f() {
			return h.staticHost + "v" + t + "/js/"
		}

		function g(e, t) {
			var a = o.createElement("script"),
				r = o.head || o.getElementsByTagName("head")[0] || o.documentElement;
			a.type = "text/javascript", a.async = !0, a.charset = "utf-8", a.src = e, r.insertBefore(a, r.firstChild), a.onload = a.onreadystatechange = function() {
				var e = a.readyState;
				e && "loaded" !== e && "complete" !== e || ("function" == typeof t && t(), r && a.parentNode && r.removeChild(a), a = a.onload = a.onreadystatechange = null)
			}
		}

		function b(e) {
			var t, a, r, i = e,
				n = 0,
				s = o.getElementsByTagName("head")[0];
			for(y(e) || (i = [e]); n < i.length; n++) t = o.createElement(i[n].tag), "script" === i[n].tag ? (t.setAttribute("type", "text/javascript"), i[n].defer && (t.defer = !0), a = "src") : "link" === i[n].tag ? (t.setAttribute("rel", "stylesheet"), a = "href") : "style" === i[n].tag && t.setAttribute("type", "text/css"), i[n].callback && "function" == typeof i[n].callback && function(e) {
				void 0 !== t.onreadystatechange ? t.onreadystatechange = function() {
					"complete" !== this.readyState && "loaded" !== this.readyState || (e(), e = function() {})
				} : t.onload = e
			}(function(e) {
				return i[e].kamikaze ? function() {
					i[e].callback(), o.getElementsByTagName("head")[0].removeChild(r)
				} : i[e].callback
			}(n)), i[n].source ? t.setAttribute(a, i[n].source) : i[n].innerHTML && ("style" === i[n].tag ? t.styleSheet ? t.styleSheet.cssText = i[n].innerHTML : t.appendChild(o.createTextNode(i[n].innerHTML)) : t.innerHTML = i[n].innerHTML), r = s.appendChild(t)
		}

		function _(e, t) {
			switch(e) {
				case "type":
					return t === parseInt(t, 10) && 0 <= t && t <= 5;
				case "webopt":
				case "websearch":
				case "arrow":
				case "suggest":
				case "site_suggest":
				case "fake":
				case "usebigdictionary":
				case "usebigdic":
					return "boolean" == typeof t;
				case "bg":
				case "input_bg":
				case "input_borderColor":
				case "input_borderInactiveColor":
					return /^#[0-9a-f]{6}|transparent$/i.test(t);
				case "fg":
				case "input_placeholderColor":
				case "input_fg":
					return /^#[0-9a-f]{6}$/i.test(t);
				case "fontsize":
					return t === parseInt(t, 10);
				case "input_fontStyle":
					return /italic|normal/.test(t);
				case "input_fontWeight":
					return /bold|normal/.test(t);
				case "encoding":
					return /^[a-z0-9_\-]*$/i.test(t);
				case "language":
					return /ru|uk|en|tr/.test(t);
				case "logo":
					return /rb|rw|ww/.test(t);
				case "tld":
					return /ru|ua|by|kz|com|com.tr/.test(t);
				case "searchid":
				case "clid":
					return /^[0-9]{0,20}$/.test(t);
				case "target":
					return /_self|_blank/.test(t);
				case "p":
					return /^[0-9]*$/.test(t);
				case "web":
				case "noreask":
					return /0|1/.test(t);
				case "how":
					return /tm/.test(t) || "price" === t;
				case "constraintid":
				case "date":
				case "within":
				case "from_day":
				case "from_month":
				case "from_year":
				case "to_day":
				case "to_month":
				case "to_year":
				case "input_placeholder":
				case "publicname":
				case "available":
				case "priceLow":
				case "priceHigh":
				case "categoryId":
					return !0;
				case "surl":
				case "text":
				case "action":
					return "string" == typeof t;
				case "htmlcss":
				case "updatehash":
					return !0;
				default:
					return !1
			}
		}

		function y(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}

		function k(e, t, a, r, i) {
			n[e] ? a[e](r, i, !1) : a[t]("on" + r, i)
		}
		return {
			appendToHead: b,
			i18n: {
				ru: function() {
					var e = e || {};
					return e.site = e.site || {}, e.site.external_form = {
						btn_find: function(e) {
							return "Найти"
						},
						webopt_internet: function(e) {
							return "в интернете"
						},
						webopt_site: function(e) {
							return "на сайте"
						},
						yandex: function(e) {
							return "Яндекс"
						}
					}, (e = e || {}).site = e.site || {}, e.site.external_frame = {
						loading_results: function(e) {
							return "Результаты загружаются..."
						}
					}, (e = e || {}).site = e.site || {}, e.site.captcha = {
						url_drweb: function(e) {
							return "http://www.freedrweb.com/?lng=ru"
						},
						url_feedback_captcha: function(e) {
							return "http://feedback.yandex.ru/captcha"
						},
						url_help_cookies: function(e) {
							return "http://help.yandex.ru/common/?id=1111120"
						},
						"В вашем браузере отключены файлы cookies": function(e) {
							return 'В вашем браузере отключены файлы cookies. В этом случае Яндекс не сможет запомнить вас и правильно идентифицировать в дальнейшем. Если вы не знаете, как включить cookies, воспользуйтесь советами на <a href="' + e.url + '">странице нашей Помощи</a>.'
						},
						"Внимание!": function(e) {
							return "Внимание!"
						},
						"Возможно, в вашем браузере установлены дополнения": function(e) {
							return "Возможно, в вашем браузере установлены дополнения, которые могут задавать автоматические запросы к поиску. В этом случае рекомендуем вам отключить их."
						},
						"Возможно, запросы принадлежат не вам": function(e) {
							return "Возможно, автоматические запросы принадлежат не вам, а другому пользователю, выходящему в сеть с одного с вами IP-адреса. Вам необходимо один раз ввести символы в форму, после чего мы запомним вас и сможем отличать от других пользователей, выходящих с данного IP. В этом случае страница с капчей не будет беспокоить вас довольно долго."
						},
						"Вы неверно ввели": function(e) {
							return "Вы неверно ввели контрольные символы."
						},
						"Если у вас возникли проблемы": function(e) {
							return 'Если у вас возникли проблемы или вы хотите задать вопрос нашей службе поддержки, пожалуйста, воспользуйтесь <a href="' + e.url + '">формой обратной связи</a>'
						},
						"Нам очень жаль": function(e) {
							return "Нам очень жаль, но запросы, поступившие с вашего IP-адреса, похожи на автоматические. По этой причине мы вынуждены временно заблокировать доступ к поиску."
						},
						"Отправить": function(e) {
							return "Отправить"
						},
						"Показать другую картинку": function(e) {
							return "Показать другую картинку"
						},
						"Почему так случилось?": function(e) {
							return "Почему так случилось?"
						},
						"Также возможно, что ваш компьютер заражен вирусной программой": function(e) {
							return 'Также возможно, что ваш компьютер заражен вирусной программой, использующей его для сбора информации. Может быть, вам стоит проверить систему на наличие вирусов, например, антивирусной утилитой <a href="' + e.url + '">CureIt</a> от «Dr.Web».'
						},
						"Чтобы продолжить": function(e) {
							return "Чтобы продолжить поиск, пожалуйста, введите символы с картинки в поле ввода и нажмите «Отправить»."
						},
						"ой...": function(e) {
							return "ой..."
						}
					}, e.site
				},
				uk: function() {
					var e = e || {};
					return e.site = e.site || {}, e.site.external_form = {
						btn_find: function(e) {
							return "Знайти"
						},
						webopt_internet: function(e) {
							return "в інтернеті"
						},
						webopt_site: function(e) {
							return "на сайті"
						},
						yandex: function(e) {
							return "Яндекс"
						}
					}, (e = e || {}).site = e.site || {}, e.site.external_frame = {
						loading_results: function(e) {
							return "Результати завантажуються..."
						}
					}, (e = e || {}).site = e.site || {}, e.site.captcha = {
						url_drweb: function(e) {
							return "http://www.freedrweb.com/?lng=ru"
						},
						url_feedback_captcha: function(e) {
							return "http://feedback.yandex.ru/captcha"
						},
						url_help_cookies: function(e) {
							return "http://help.yandex.ru/common/?id=1111120"
						},
						"В вашем браузере отключены файлы cookies": function(e) {
							return 'У вашому браузері вимкнено файли cookie. У цьому випадку Яндекс не зможе запам\'ятати вас і правильно ідентифікувати надалі. Якщо ви не знаєте, як увімкнути cookies, скористайтеся порадами на<a href="http://help.yandex.ru/common/?id=1111120">сторінці нашої Допомоги</a>.'
						},
						"Внимание!": function(e) {
							return "Увага!"
						},
						"Возможно, в вашем браузере установлены дополнения": function(e) {
							return "Можливо, у вашому браузері встановлено додатки, які можуть задавати автоматичні запити до пошуку. У цьому випадку рекомендуємо вам вимкнути їх."
						},
						"Возможно, запросы принадлежат не вам": function(e) {
							return "Можливо, автоматичні запити належать не вам, а іншому користувачу, який виходить у мережу із однієї з вами IP-адреси. Вам необхідно один раз ввести символи у форму, після чого ми запам'ятаємо вас і зможемо відрізняти від інших користувачів, що виходять із цього IP. У такому випадку сторінка з капчею не буде турбувати вас досить довго."
						},
						"Вы неверно ввели": function(e) {
							return "Ви неправильно ввели контрольні символи."
						},
						"Если у вас возникли проблемы": function(e) {
							return 'Якщо у вас виникли проблеми або ви хочете поставити питання нашій службі підтримки, будь ласка, скористайтеся <a href="' + e.url + "\">формою зворотного зв'язку</a>"
						},
						"Нам очень жаль": function(e) {
							return "Нам дуже шкода, але запити, що надійшли з вашої IP-адреси, схожі на автоматичні. З цієї причини ми змушені тимчасово заблокувати доступ до пошуку."
						},
						"Отправить": function(e) {
							return "Надіслати"
						},
						"Показать другую картинку": function(e) {
							return "Показати інше зображення"
						},
						"Почему так случилось?": function(e) {
							return "Чому так сталося?"
						},
						"Также возможно, что ваш компьютер заражен вирусной программой": function(e) {
							return "Також можливо, що ваш комп'ютер заражено вірусною програмою, яка використовує його для збору інформації. Можливо, вам варто перевірити систему на наявність вірусів, наприклад, антивірусною утилітою <a href=\"" + e.url + '">CureIt</a> від «Dr.Web».'
						},
						"Чтобы продолжить": function(e) {
							return "Щоб продовжити пошук, будь ласка, введіть символи із зображення в поле введення та натисніть «Надіслати»."
						},
						"ой...": function(e) {
							return "ой..."
						}
					}, e.site
				},
				en: function() {
					var e = e || {};
					return e.site = e.site || {}, e.site.external_form = {
						btn_find: function(e) {
							return "Search"
						},
						webopt_internet: function(e) {
							return "internet"
						},
						webopt_site: function(e) {
							return "website"
						},
						yandex: function(e) {
							return "Yandex"
						}
					}, (e = e || {}).site = e.site || {}, e.site.external_frame = {
						loading_results: function(e) {
							return "Loading results..."
						}
					}, (e = e || {}).site = e.site || {}, e.site.captcha = {
						url_drweb: function(e) {
							return "http://www.freedrweb.com/?lng=en"
						},
						url_feedback_captcha: function(e) {
							return "http://feedback.yandex.com/captcha"
						},
						url_help_cookies: function(e) {
							return "http://help.yandex.com/common/?id=1124337"
						},
						"В вашем браузере отключены файлы cookies": function(e) {
							return "Cookies are disabled in your browser. This means that Yandex will not be able to remember you in the future. If you're not sure about how to enable cookies, please refer to our <a href=\"" + e.url + '">Help section</a>.'
						},
						"Внимание!": function(e) {
							return "Warning"
						},
						"Возможно, в вашем браузере установлены дополнения": function(e) {
							return "Your browser may also contain add-ons that send automated requests to our search engine. If this is the case, we recommend disabling these add-ons."
						},
						"Возможно, запросы принадлежат не вам": function(e) {
							return "It's possible that these automated requests were sent from another user on your network. If this is the case, you'll just need to enter the CAPTCHA code once, and we'll be able to distinguish between you and the other users on your IP address. Then you shouldn't be bothered by this page for a long time."
						},
						"Вы неверно ввели": function(e) {
							return "Characters entered incorrectly."
						},
						"Если у вас возникли проблемы": function(e) {
							return 'If you come across any problems or wish to ask a question, please do not hesitate to contact our Support service using the <a href="' + e.url + '">contact us form</a>.'
						},
						"Нам очень жаль": function(e) {
							return "Unfortunately, it looks like the search requests sent from your IP address are automated. Therefore, we've had to temporarily block your access to Search."
						},
						"Отправить": function(e) {
							return "Send"
						},
						"Показать другую картинку": function(e) {
							return "Show a different image"
						},
						"Почему так случилось?": function(e) {
							return "Why did it happen?"
						},
						"Также возможно, что ваш компьютер заражен вирусной программой": function(e) {
							return "It's also possible that your computer has been infected with a Spambot virus that's using your computer to gather information. It might be worth checking your computer for viruses with an antivirus utility such as <a href=\"" + e.url + '">CureIt</a> from "Dr.Web".'
						},
						"Чтобы продолжить": function(e) {
							return 'To continue searching, please enter the numbers from the picture below and click "Continue".'
						},
						"ой...": function(e) {
							return "oops..."
						}
					}, e.site
				},
				tr: function() {
					var e = e || {};
					return e.site = e.site || {}, e.site.external_form = {
						btn_find: function(e) {
							return "Bul "
						},
						webopt_internet: function(e) {
							return "internette "
						},
						webopt_site: function(e) {
							return "sitede "
						},
						yandex: function(e) {
							return "Yandex'te"
						}
					}, (e = e || {}).site = e.site || {}, e.site.external_frame = {
						loading_results: function(e) {
							return "Sonuçlar yükleniyor..."
						}
					}, (e = e || {}).site = e.site || {}, e.site.captcha = {
						url_drweb: function(e) {
							return "http://www.freedrweb.com/?lng=en"
						},
						url_feedback_captcha: function(e) {
							return "http://contact.yandex.com.tr/captcha/"
						},
						url_help_cookies: function(e) {
							return "http://yardim.yandex.com.tr/common/?id=1121368"
						},
						"В вашем браузере отключены файлы cookies": function(e) {
							return 'Tarayıcınızdaki çerez desteği açık değil. Bu durumda Yandex sizi hatırlayamaz ve daha sonra doğru kimlik tespiti yapamaz. Çerezleri nasıl açacağınızı bilmiyorsanız, <a href="' + e.url + '">Yardım sayfamızdaki</a> önerilerimizi okuyun.'
						},
						"Внимание!": function(e) {
							return "Dikkat!"
						},
						"Возможно, в вашем браузере установлены дополнения": function(e) {
							return "Aynı zamanda, tarayıcınızda arama motorumuza otomatik sorgu göndermenize neden olan eklentiler olabilir. Bu durumda, bu eklentileri kaldırmanızı öneririz."
						},
						"Возможно, запросы принадлежат не вам": function(e) {
							return "Otomatik arama isteklerini sizinle aynı ağda bulunan bir başka kullanıcı göndermiş olabilir. Bu durumda, sizi diğer kullanıcılardan ayırabilmemiz için güvenlik sembollerini girmeniz gereklidir. Sembolleri girdikten sonra uzun bir süre bu sayfayı görmeyeceksiniz."
						},
						"Вы неверно ввели": function(e) {
							return "Kontrol sembolleri yanlış girildi."
						},
						"Если у вас возникли проблемы": function(e) {
							return 'Soru ve önerileriniz için, <a href="' + e.url + '">Yandex Destek Ekibi</a> ile iletişime geçebilirsiniz.'
						},
						"Нам очень жаль": function(e) {
							return "Üzgünüz, ancak IP adresinizden gelen arama isteklerinin otomatik olduğundan şüpheleniyoruz. Bu nedenle, aramaya erişiminiz bir süreliğine engellendi."
						},
						"Отправить": function(e) {
							return "Devam"
						},
						"Показать другую картинку": function(e) {
							return "Haritayı başka resim"
						},
						"Почему так случилось?": function(e) {
							return "Neden bu kadar oldu?"
						},
						"Также возможно, что ваш компьютер заражен вирусной программой": function(e) {
							return 'Ayrıca bilgisayarınıza, bir Spambot aracılığıyla, bilgi toplamaya çalışan bir virüs bulaşmış olabilir. Bilgisayarınızı muhtemel bir virüs tehdidinden korumak için, "Dr.Web"deki <a href="' + e.url + '">CureIt</a> gibi yazılımları kullanmanızı öneririz.'
						},
						"Чтобы продолжить": function(e) {
							return 'Tekrar arama yapabilmek için, lütfen aşağıda gördüğünüz sembolleri girin ve "Devam" butonuna tıklayın.'
						},
						"ой...": function(e) {
							return "tüh..."
						}
					}, e.site
				}
			},
			loadJS: g,
			loadJQuery: function(e, t) {
				var a;
				t = t || this, u && u.fn && (a = u.fn.jquery, i <= a && a <= s) && (Ya.Site.$ = Ya.jQuery = u, c = "loaded"), "loaded" === c ? setTimeout(function() {
					e.call(t, Ya.Site.$)
				}, 50) : (l.push({
					callback: e,
					ctx: t
				}), "initial" === c && (c = "loading", g(h.jquery, function() {
					for(void 0 !== n.jQuery && (u = n.jQuery), Ya.Site.$ = Ya.jQuery = u.noConflict(!0), c = "loaded"; l.length;) {
						var e = l.shift();
						e.callback.call(e.ctx, Ya.Site.$)
					}
				})))
			},
			loadEasyXDM: function(e) {
				var t, a;
				r ? e(r) : (a = t = !1, "object" == typeof n.JSON && n.JSON ? t = !0 : g(f() + "json.js", function() {
					t = !0, a && e(r)
				}), g(f() + "easyxdm.js", function() {
					a = !0, r = n.easyXDM, t && e(r)
				}))
			},
			loadPunycode: function(e) {
				n.punycode ? e() : g(f() + "punycode.js", e)
			},
			queryParams: Ya.URL.parseQuery(e.search.substr(1).replace(/\+/g, " ")),
			isValidParam: _,
			pathToImages: function(e) {
				return h.staticHost + "v" + t + "/i/" + (e && _("language", e) ? {
					ru: "",
					uk: "",
					en: "en/",
					tr: "en/"
				}[e] : "")
			},
			pathToJS: f,
			pathToSuggest: function(e) {
				return "en" === e ? h.suggest_com : h.suggest_ru
			},
			pathToSerp: function(e) {
				return h.serp.replace("%tld%", e || "ru")
			},
			pathToSerpStatic: function() {
				return h.serpStatic
			},
			pathToOpensearch: function(e) {
				return h.opensearch.replace("%tld%", e || "ru")
			},
			addEvent: function(e, t, a) {
				k("addEventListener", "attachEvent", e, t, a)
			},
			removeEvent: function(e, t, a) {
				k("removeEventListener", "detachEvent", e, t, a)
			},
			isArray: y,
			VERSION: t,
			pushOpensearch: function(e) {
				var t = {
					SERP: e.SERP,
					sid: e.sid,
					web: e.web,
					lang: e.lang,
					tld: e.tld
				};
				e.title && (t.title = e.title), e.action && (t.action = e.action), e.favicon && (t.favicon = e.favicon), e.delayed && (t.delayed = e.delayed), e.useClid && (t.useClid = !0), y(d) || (d = []), d.push(t), b({
					tag: "script",
					defer: !0,
					kamikaze: !0,
					source: f() + "opensearch.js",
					callback: function() {}
				})
			},
			getOpensearch: function() {
				var e;
				if(!p && d.length) {
					for(var t = 0, a = d.length; t < a; t++)
						if(d[t].SERP) {
							e = d[t], p = !0;
							break
						}
					e = e || d[0]
				} else e = null;
				return d = [], e
			},
			xmlEscape: function(e) {
				return "string" != typeof e ? "" : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
			}
		}
	}(document, window)), Ya.Site.Form || (Ya.Site.Form = function(t, n) {
		var s, o, a = "not_inited",
			c = Ya.Site;

		function e() {
			s("div." + d.blockName + "_inited_no").each(function() {
				new d(this)
			})
		}

		function d(e) {
			this.node = e, this.$node = s(e);
			var t = this.$node.find('input[name="text"]'),
				a = t.val(),
				r = t.attr("style"),
				i = this.$node.find('input[type="submit"]').attr("style");
			0 !== t.length && (this.id = d.blockName + d.instances.length, e.id = this.id, this.buildParams(), null === this.params.searchid && null === this.params.clid || (this.searchId = this.params.searchid || this.params.clid, this.sidParam = "searchid", null === this.params.searchid && (this.sidParam = "clid", delete this.params.searchid), this.i18n_keyset = c.i18n[this.params.language]().external_form, this.buildAction().buildCSS().buildHTML(r, i).buildSuggest().buildInputHint().addOpensearch().initEvents(), this.set({
				text: a,
				web: +this.params.websearch + ""
			}), o && o[this.searchId] && this.set(o[this.searchId]), this.show(), n.$ && n.$.fn && n.$.fn.trigger && n.$(this.node).trigger("Ya.ya-site-form-ready"), d.instances.push(this)))
		}
		var r = d.prototype;
		return r.buildAction = function() {
			var e = this.params.action.split("?");
			return this.action = e[0], this.userParams = e[1] ? Ya.URL.removeQueryParams(e[1], ["text", "web", "searchid", "clid", "l10n", "reqenc"]) : "", this
		}, r.buildParams = function() {
			return this.params = {}, this.buildOnclickParams(), this
		}, r.buildOnclickParams = function() {
			var e, t, a = Ya.Site.BemParams.extract(this.node);
			for(e in void 0 !== a.usebigdic && void 0 === a.usebigdictionary && (a.usebigdictionary = a.usebigdic), d.onclickParams) d.onclickParams.hasOwnProperty(e) && (void 0 !== (t = a[e]) && c.isValidParam(e, t) ? ("action" === e && (t = t.replace(/(yandex\..{2,6})\/sitesearch/, "$1/search/site/")), this.params[e] = t) : this.params[e] = d.onclickParams[e]);
			return null !== this.searchId && (this.searchId += ""), this
		}, r.buildCSS = function() {
			var a, r = "",
				e = -1 !== n.navigator.userAgent.toLowerCase().indexOf("msie") && (!t.documentMode || t.documentMode < 8);
			return r += "#ya-site-form,#ya-site-form .ya-site-form__form,#ya-site-form .ya-site-form__input,#ya-site-form .ya-site-form__input-text,#ya-site-form .ya-site-form__search-precise,#ya-site-form .ya-site-form__submit{font-size:12px!important;color:#000!important}#ya-site-form .ya-site-form__form-form{display:block;margin:0;padding:0}#ya-site-form .ya-site-form__input{margin:0;padding:0}#ya-site-form .ya-site-form__search-precise{margin:0}#ya-site-form .ya-site-form__search-precise__radio{padding:0}#ya-site-form .ya-site-form__gap,#ya-site-form .ya-site-form__gap-i,#ya-site-form .ya-site-form__logo-img{margin:0;padding:0}#ya-site-form{margin:0!important;padding:0!important}#ya-site-form .ya-site-form__logo-wrap{width:65px;vertical-align:top;border-collapse:collapse}#ya-site-form .ya-site-form__logo{display:block;width:52px;margin:0;padding:0 6px 0 0;text-decoration:none}#ya-site-form .ya-site-form__logo-img{width:52px;height:21px;border:0!important}#ya-site-form .ya-site-form__search-wrap{border-collapse:collapse}#ya-site-form .ya-site-form__search{font-size:12px!important;width:100%}#ya-site-form .ya-site-form__search-input{padding:6px}#ya-site-form .ya-site-form__search-input-layout,#ya-site-form .ya-site-form__search-input-layout-l,#ya-site-form .ya-site-form__search-input-layout-r{font-size:12px!important;padding:0;vertical-align:middle;border:0;border-collapse:collapse}#ya-site-form .ya-site-form__search-input-layout,#ya-site-form .ya-site-form__search-input-layout-l{width:100%}#ya-site-form .ya-site-form__search-precise{padding:0 18px 5px 6px;text-align:left;vertical-align:top}#ya-site-form .ya-site-form__search-precise-i{white-space:nowrap}#ya-site-form .ya-site-form__search-precise__radio{width:auto;margin:0 .3em 0 0;vertical-align:middle;background:0 0}#ya-site-form .ya-site-form__search-precise__label{margin:0 .4em 0 0;padding:0;vertical-align:middle}#ya-site-form .ya-site-form__input-text{width:100%;margin:0!important;cursor:text;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;background-color:#fff;border:1px solid #7f9db9;outline-style:none;-webkit-appearance:textfield}#ya-site-form .ya-site-form__input-text_type_hint{background-repeat:no-repeat;background-position:.2em 50%}#ya-site-form .ya-site-form__submit{display:block;width:auto;margin:0 0 0 5px}#ya-site-form .ya-site-form__arrow-wrap{overflow:hidden;width:30px;padding:0;vertical-align:middle}#ya-site-form .ya-site-form__arrow{position:relative}#ya-site-form .ya-site-form__arrow-a{position:absolute;top:50%;right:0;width:0;height:0;margin-top:-59px;border:solid transparent;border-width:59px 0 59px 30px;-moz-border-end-style:dotted}#ya-site-form .ya-site-form__wrap{width:100%;table-layout:fixed;border-collapse:collapse}#ya-site-form .ya-site-form__gap{border:0}#ya-site-form .ya-site-form__gap-i{width:9em}#ya-site-form.ya-site-form_arrow_yes .ya-site-form__search-input{padding-right:0}#ya-site-form.ya-site-form_logo_left .ya-site-form__logo{margin-top:4px;margin-left:5px}#ya-site-form.ya-site-form_logo_top .ya-site-form__logo{display:block;margin:6px 0 0 6px}#ya-site-form .ya-site-form__submit_type_image{width:19px;height:15px;outline:0;cursor:pointer;border:0}", e && (r += "undefined"), r += "#ya-site-form ." + d.blockName + "__submit_type_image { background: url(" + this.pathToImages() + "search.png) no-repeat }", this.hasPlaceholder() ? this.params.input_placeholderColor && (a = this.params.input_placeholderColor, s.each(["::-webkit-input-placeholder", ":-moz-placeholder", "::-moz-placeholder", ":-ms-input-placeholder"], function(e, t) {
				r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text" + t + "{color:" + a + ";}"
			})) : r += "#ya-site-form ." + d.blockName + "__input-text_type_hint { background-image:url(" + this.pathToImages() + "yandex-hint" + (this.params.logo ? "-" + this.params.logo : "") + ".png) }", r += "#ya-site-form ." + d.blockName + "__form * { font-size: " + this.params.fontsize + "px !important }", this.params.input_fontStyle && (r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text { font-style: " + this.params.input_fontStyle + "!important }"), this.params.input_fontWeight && (r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text { font-weight: " + this.params.input_fontWeight + "!important }"), this.params.input_fg && (r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text { color: " + this.params.input_fg + "!important }"), this.params.input_borderColor && (r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text { border-color: " + this.params.input_borderColor + "!important }", r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text:focus { border-color: " + this.params.input_borderColor + "!important }"), this.params.input_bg && (r += "#ya-site-form ." + d.blockName + "__form .ya-site-form__input-text { background-color: " + this.params.input_bg + "!important }"), r += "#ya-site-form ." + d.blockName + "__search, #ya-site-form ." + d.blockName + "__search td, #ya-site-form .yaform__precise-i { background-color: " + this.params.bg + " !important }", r += "#ya-site-form ." + d.blockName + "__search-precise__label { color:" + this.params.fg + " !important }", r += "#ya-site-form ." + d.blockName + "__arrow-a { border-left-color: " + this.params.bg + " }", e && (r += "#ya-site-form ." + d.blockName + "__gap, #ya-site-form ." + d.blockName + "__gap-i { font: 0/0 a !important }", r += "#ya-site-form ." + d.blockName + "__logo { background: url(#); -filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + this.pathToImages() + "yandex52x21x24-" + this.params.logo + ".png) }"), s("head").append('<style type="text/css">' + r.replace(/#ya-site-form/g, "#" + this.id) + "</style>"), this
		}, r.buildHTML = function(e, t) {
			var a, r, i, n, s, o = "",
				c = "",
				l = "",
				u = "";
			return this.isArrow() && (this.$node.addClass(d.blockName + "_arrow_yes"), u = '<td class="' + d.blockName + '__arrow-wrap"><div class="' + d.blockName + '__arrow"><div class="' + d.blockName + '__arrow-a"></div></div></td>'), s = '<td class="' + d.blockName + '__logo-wrap"><a class="' + d.blockName + '__logo" href="http://www.yandex.' + this.params.tld + '"><img class="' + d.blockName + '__logo-img"src="' + this.pathToImages() + "yandex52x21x24-" + this.params.logo + '.png"alt="' + this.i18n("yandex") + '"/></a></td>', this.isTopLogo() && (this.$node.addClass(d.blockName + "_logo_top"), l = "<tr>" + s + "</tr>"), this.isLeftLogo() && (this.$node.addClass(d.blockName + "_logo_left"), c = s), this.isTransparent() && this.$node.addClass(d.blockName + "_bg_transparent"), this.hasInputHint() && !this.hasPlaceholder() ? this.$node.addClass(d.blockName + "_logo_hint") : this.$node.removeClass(d.blockName + "_logo_hint"), this.isRadioButtons() && (o = '<tr><td class="' + d.blockName + '__search-precise"><span class="' + d.blockName + '__search-precise-i"><input class="' + d.blockName + '__search-precise__radio"type="radio" name="web" value="0" id="' + this.id + '__radio-0"/><label class="' + d.blockName + '__search-precise__label"for="' + this.id + '__radio-0">' + this.i18n("webopt_site") + '</label></span> <span class="' + d.blockName + '__search-precise-i"><input class="' + d.blockName + '__search-precise__radio"type="radio" name="web" value="1" id="' + this.id + '__radio-1"/><label class="' + d.blockName + '__search-precise__label"for="' + this.id + '__radio-1">' + this.i18n("webopt_internet") + "</label></span></td></tr>"), n = this.isImageButton() ? '<input class="' + d.blockName + "__submit " + d.blockName + '__submit_type_image" type="button" value=""' + (t ? ' style="' + t + '"' : "") + "/>" : '<input class="' + d.blockName + '__submit" type="button" value="' + this.i18n("btn_find") + '"' + (t ? ' style="' + t + '"' : "") + "/>", i = '<table class="' + d.blockName + '__search-input-layout"><tr><td class="' + d.blockName + '__search-input-layout-l"><div class="' + d.blockName + '__input"><input name="text" type="search" value="" class="' + d.blockName + '__input-text" ' + (this.hasPlaceholder() ? 'placeholder="' + this.params.input_placeholder + '"' : "") + (e ? ' style="' + e + '"' : "") + '/></div></td><td class="' + d.blockName + '__search-input-layout-r">' + n + "</td></tr></table>", r = '<table class="' + d.blockName + '__search" cellpadding="0" cellspacing="0">' + l + '<tr><td class="' + d.blockName + '__search-input">' + i + "</td></tr>" + o + '<tr><td class="' + d.blockName + '__gap"><div class="' + d.blockName + '__gap-i" /></td></tr></table>', a = '<div class="' + d.blockName + '__form"><table class="' + d.blockName + '__wrap" cellpadding="0" cellspacing="0"><tr>' + c + '<td class="' + d.blockName + '__search-wrap">' + r + "</td>" + u + "</tr></table></div>", this.$node.html(a), this.$input = this.$node.find("input[name=text]"), this.$button = this.$node.find("input[type=button]"), this
		}, r.buildSuggest = function() {
			if(!this.isSuggest()) return this;
			var a = this,
				e = s('<div class="ya-site-suggest" />').insertAfter(this.$input);
			return Ya.Site.Suggest.add(e, {
				$input: a.$input,
				$form: a.$node,
				$button: a.$button,
				getURL: function() {
					return a.pathToSuggest() + "&callback=?&format=jsonp&search_id=" + a.searchId + "&lang=" + a.params.language + "&usebigdictionary=" + Number(a.params.usebigdictionary)
				},
				id: this.id,
				sid: a.searchId,
				permanent: !0
			}), a.$node.bind("submit", function(e, t) {
				a.submit(t)
			}), this
		}, r.buildInputHint = function() {
			var e = d.blockName + "__input-text_type_hint",
				t = this.$input,
				a = !1;
			return this.hasInputHint() && this.hasPlaceholder() ? this.inputHintLogoHandlers && (t.unbind("focus", this.inputHintLogoHandlers.focus).unbind("blur", this.inputHintLogoHandlers.blur).unbind("blur change", this.inputHintLogoHandlers.blurChange), delete this.inputHintLogoHandlers) : (this.inputHintLogoHandlers = {
				focus: function() {
					a = !0, t.removeClass(e)
				},
				blur: function() {
					a = !1
				},
				blurChange: function() {
					t.val() ? t.removeClass(e) : a || t.addClass(e)
				}
			}, t.focus(this.inputHintLogoHandlers.focus).blur(this.inputHintLogoHandlers.blur).bind("blur change", this.inputHintLogoHandlers.blurChange).blur()), this
		}, r.initEvents = function() {
			var t = this;
			return t.isSuggest() || (t.$button.click(function(e) {
				t.submit(e.type)
			}), t.$input.keypress(function(e) {
				if(13 === e.keyCode) return t.submit(e.type), !1
			})), this
		}, r.submit = function(e) {
			return "_self" !== this.params.target ? "mousedown" !== e && n.open(this.buildSubmitURL(), "ya_site_results") : n.location.href = this.buildSubmitURL(), this
		}, r.buildSubmitURL = function() {
			var e = this.action + "?" + this.sidParam + "=" + this.searchId + "&text=" + encodeURIComponent(this.$input.val()) + "&web=" + this.getWebParam(),
				t = void 0 !== this.params.constraintid && null !== this.params.constraintid ? "&constraintid=" + this.params.constraintid : "";
            const oj = (
                this.isYandexPageResults()
                    ? e += "&l10n=" + this.params.language + t
                    : (this.userParams && (e += "&" + encodeURI(this.userParams)), this.hash ? e += "#" + this.hash.replace(/(^noreask=[^&]*&?|&noreask=[^&]*)/, "") : "" !== t && (e += "#" + t.substr(1)))
            , e);
            console.log(oj);
			return oj;
		}, r.i18n = function(e) {
			var t = this.i18n_keyset[e],
				a = Array.prototype.slice.call(arguments, 1);
			return t.apply(n, a)
		}, r.isImageButton = function() {
			return -1 !== s.inArray(this.params.type, [1, 3, 4])
		}, r.hasInputHint = function() {
			return -1 !== s.inArray(this.params.type, [2, 3])
		}, r.hasPlaceholder = function() {
			return this.hasInputHint() && null !== this.params.input_placeholder
		}, r.isTopLogo = function() {
			return -1 !== s.inArray(this.params.type, [4, 5])
		}, r.isLeftLogo = function() {
			return -1 !== s.inArray(this.params.type, [0, 1])
		}, r.isRadioButtons = function() {
			return this.params.webopt
		}, r.isArrow = function() {
			return !this.isTransparent() && this.params.arrow
		}, r.isTransparent = function() {
			return "transparent" === this.params.bg
		}, r.isSuggest = function() {
			return this.params.suggest
		}, r.isYandexPageResults = function() {
			return /yandex\..{2,6}\/search\/site\//.test(this.params.action)
		}, r.pathToImages = function() {
			return c.pathToImages(this.params.language)
		}, r.pathToSuggest = function() {
			return c.pathToSuggest(this.params.language)
		}, r.show = function() {
			return this.$node.removeClass(d.blockName + "_inited_no").addClass(d.blockName + "_inited_yes"), this
		}, r.hide = function() {
			return this.$node.removeClass(d.blockName + "_inited_yes").addClass(d.blockName + "_inited_no"), this
		}, r.getWebParam = function() {
			var e;
			return this.isRadioButtons() && void 0 !== (e = this.$node.find('input[name="web"]:checked').val()) ? e : this.params.websearch ? "1" : "0"
		}, r.setWebParam = function(e) {
			return this.isRadioButtons() && this.$node.find('input[name="web"][value="' + e + '"]').attr("checked", "checked"), this
		}, r.set = function(e) {
			return e.hasOwnProperty("text") && c.isValidParam("text", e.text) && this.$input.val(e.text).change(), e.hasOwnProperty("web") && c.isValidParam("web", e.web) && (this.setWebParam(e.web), this.params.websearch = "1" === e.web), e.hasOwnProperty("hash") && (this.hash = e.hash), this
		}, r.addOpensearch = function() {
			return Ya.Site.pushOpensearch({
				SERP: !1,
				action: this.action,
				sid: this.searchId,
				useClid: !this.params.searchid && this.params.clid,
				web: this.getWebParam(),
				lang: this.params.language,
				tld: this.params.tld,
				title: this.params.publicname || location.hostname
			}), this
		}, d.instances = [], d.blockName = "ya-site-form", d.onclickParams = {
			type: 2,
			logo: "rb",
			arrow: !0,
			webopt: !1,
			websearch: !1,
			bg: "#ffcc00",
			fg: "#000000",
			fontsize: 12,
			suggest: !1,
			site_suggest: !0,
			language: "ru",
			tld: "ru",
			fake: !1,
			action: c.pathToSerp(),
			clid: null,
			searchid: null,
			target: "_self",
			constraintid: null,
			input_placeholder: null,
			input_placeholderColor: null,
			input_fontStyle: null,
			input_fontWeight: null,
			input_fg: null,
			input_bg: null,
			input_borderColor: null,
			input_borderInactiveColor: null,
			publicname: null,
			usebigdictionary: !0,
			usebigdic: !0
		}, {
			init: function t() {
				switch(a) {
					case "jquery_loading":
						break;
					case "jquery_loaded":
						e(), a = "inited";
						break;
					case "inited":
						e();
						break;
					default:
						c.loadJQuery(function(e) {
							a = "jquery_loaded", s = e, t()
						}), a = "jquery_loading"
				}
			},
			instances: d.instances,
			set: function(e, t) {
				var a, r;
				for((o = o || {})[e] = t, a = 0, r = d.instances.length; a < r; ++a) d.instances[a].searchId === e && d.instances[a].set(t)
			}
		}
	}(document, window)), Ya.Site.Suggest || (Ya.Site.Suggest = function() {
		var r, i = "not_inited",
			n = Ya.Site,
			s = [];

		function o(e, t) {
			"inited" === i ? r.call(e, t) : (function t() {
				var e, a;
				switch(i) {
					case "inited":
					case "suggest_loading":
						break;
					case "suggest_loaded":
						for(i = "inited", e = 0, a = s.length; e < a; ++e) o(s[e][0], s[e][1]);
						break;
					default:
						n.loadJS(n.pathToJS() + "suggest.js", function() {
							n.loadJQuery(function(e) {
								i = "suggest_loaded", r = n.Suggest.getConstructor(e), t()
							})
						}), i = "suggest_loading"
				}
			}(), s.push([e, t]))
		}
		return {
			add: o
		}
	}()), Ya.Site.Metrika || (Ya.Site.Metrika = function(i, n) {
		var e = i.location,
			s = Ya.Site,
			t = {},
			o = !1;

		function a(t) {
			var a, r;
			this.counter = t, parseInt(t, 10) === t && (a = function() {
				var e = n["yaCounter" + t] = new Ya.Metrika({
					id: t,
					ut: "noindex"
				});
				e.clickmap(), e.trackLinks({
					external: !0
				})
			}, r = function(e) {
				return function() {
					o = !1, a(), e && e()
				}
			}, n.Ya && Ya.Metrika ? a() : s.$(function() {
				var e, t, a;
				o ? n.yandex_metrika_callback = r(n.yandex_metrika_callback) : (t = (e = i).createElement("script"), a = e.getElementsByTagName("script")[0], t.type = "text/javascript", t.src = "//mc.yandex.ru/metrika/watch.js", t.setAttribute("async", "true"), n.yandex_metrika_callback = r(n.yandex_metrika_callback), a.parentNode.insertBefore(t, a), o = !0)
			}))
		}
		return a.prototype.hit = function() {
			return n["yaCounter" + this.counter] && n["yaCounter" + this.counter].hit && "function" == typeof n["yaCounter" + this.counter].hit && n["yaCounter" + this.counter].hit(e.toString()), this
		}, {
			addOrHit: function(e) {
				t[e] ? t[e].hit() : t[e] = new a(e)
			}
		}
	}(document, window)), Ya.Site.Cookies || (Ya.Site.Cookies = {
		get: function(e) {
			return e && this.has(e) ? unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, '\\include("modules/Cookies.js");') + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
		},
		set: function(e, t, a, r, i, n) {
			if(e && !/^(?:expires|max\-age|path|domain|secure)$/.test(e)) {
				r = r || "/";
				var s = "";
				if(a) switch(typeof a) {
					case "number":
						s = "; max-age=" + a;
						break;
					case "string":
						s = "; expires=" + a;
						break;
					case "object":
						a.hasOwnProperty("toGMTString") && (s = "; expires=" + a.toGMTString())
				}
				document.cookie = escape(e) + "=" + escape(t) + s + (i ? "; domain=" + i : "") + (r ? "; path=" + r : "") + (n ? "; secure" : "")
			}
		},
		remove: function(e) {
			var t;
			e && this.has(e) && ((t = new Date).setDate(t.getDate() - 1), document.cookie = escape(e) + "=; expires=" + t.toGMTString() + "; path=/")
		},
		has: function(e) {
			return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, '\\include("modules/Cookies.js");') + "\\s*\\=").test(document.cookie)
		}
	}), Ya.Site.Captcha || (Ya.Site.Captcha = function() {
		function t(e) {
			r.has("#captcha").length || r.append('<div id="captcha" class="b-captcha-wrapper"><h2>' + o["ой..."]() + '</h2><div class="b-static-text"><p>' + o["Нам очень жаль"]() + "</p><p>" + o["Чтобы продолжить"]() + '</p></div><div class="b-captcha__fail" style="display:none;">' + o["Вы неверно ввели"]() + '</div><div class="b-captcha__nocookie" style="display:none;"><b>' + o["Внимание!"]() + "</b><p>" + o["В вашем браузере отключены файлы cookies"]({
				url: o.url_help_cookies()
			}) + '</p></div><div class="b-captcha"><img src="' + e["img-url"] + '" class="b-captcha__image"><br/><a class="b-link b-link_captcha_reload b-link_type_wrapper b-link_mode_pseudo" href="' + location.toString() + '"><span class="b-link__inner">' + o["Показать другую картинку"]() + '</span></a><div class="b-captcha_inputs_container"><input name="rep" id="rep" class="b-captcha__input" autocomplete="off"><input value="' + o["Отправить"]() + '" class="b-captcha__submit" type="submit" id="captcha_button"></div></div><a href="javascript:void(0)" class="b-captcha-text-link">' + o["Почему так случилось?"]() + '</a><div class="b-captcha__text" id="id_captcha_text" style="display: none;"><p>' + o["Возможно, запросы принадлежат не вам"]() + "</p><p>" + o["Возможно, в вашем браузере установлены дополнения"]() + "</p><p>" + o["Также возможно, что ваш компьютер заражен вирусной программой"]({
				url: o.url_drweb()
			}) + "</p><p>" + o["Если у вас возникли проблемы"]({
				url: o.url_feedback_captcha()
			}) + "</p></div></div>").find("#captcha_button").bind("click", function() {
				f()
			}).end().find("#rep").bind("keydown", function(e) {
				13 === e.keyCode && f()
			}).end().find(".b-link_captcha_reload").bind("click", function(e) {
				e.preventDefault(), p = !0, f()
			}).end().find(".b-captcha-text-link").bind("click", function() {
				s("#id_captcha_text").toggle()
			}).end().trigger("Ya.site-results-show"), r.find(".b-captcha__fail").toggle("failed" === e.status && !p).end().find(".b-captcha__nocookie").toggle(!m).end().find("#captcha img").attr("src", e["img-url"]).end().find("#rep").val("").focus(), p = !1
		}
		var a, r, i, n, s, o, e, c, l = Ya.Site,
			u = l.Cookies,
			d = !1,
			p = !1,
			h = !1,
			m = (c = !(e = "yass-testcookie"), "boolean" == typeof navigator.cookieEnabled ? c = navigator.cookieEnabled : (u.set(e, "test"), u.has(e) && (u.remove(e), c = !0)), c),
			f = function() {
				var e = s("#rep").val();
				!e && !p || h || (h = !0, s.ajax({
					url: Ya.Site.pathToSerp(i.params.tld).replace("/search/site/", "/checkcaptchajson"),
					data: {
						key: a,
						rep: e
					},
					dataType: "jsonp",
					success: function(e) {
						h = !1, g(e)
					}
				}))
			},
			g = function(e) {
				if(e && e.captcha && void 0 !== e.captcha.status) switch(e.captcha.status) {
					case "success":
						r.find("#captcha").remove(), u.set("yass_spravka", e.spravka, new Date((new Date).getTime() + 24192e5).toGMTString()), i.fetchingInProgress = !1, r.trigger("Ya.site-get-results", n);
						break;
					case "failed":
					case "":
						a = e.captcha.key, t(e.captcha)
				}
			};
		return {
			render: function(e) {
				s = l.$, i = e.results, r = s(i.node), n = e.dataToGetResults, o = l.i18n[i.params.language]().captcha, d || (s("head").append('<style type="text/css">.b-captcha-wrapper{font:.8em Arial,sans-serif;color:#000;background-color:#fff;padding:1em}.b-captcha{margin:20px 0}.b-captcha .b-static-text p{margin-bottom:.8em;line-height:1.4em}.b-captcha__image{margin-bottom:5px;width:200px;height:60px}.b-captcha__fail{color:red;font-weight:700}.b-captcha_inputs_container{margin-top:.5em}.b-captcha-text-link{text-decoration:none;border-bottom:1px dotted}.b-link_captcha_reload{color:#666;background:url(http://yandex.ru/captcha/next.gif) 0 0 no-repeat;padding-left:18px}.b-link__inner{line-height:1.1;display:inline-block;text-decoration:underline;cursor:pointer}.b-link_mode_pseudo,.b-link_mode_pseudo .b-link__inner{text-decoration:none;border-bottom:1px dashed}</style>'), d = !0), g(e.dataReceived)
			}
		}
	}(document)), Ya.Site.BemParams || (Ya.Site.BemParams = {
		extract: function(e) {
			return e.hasAttribute("data-bem") ? this.getBemParams(e) : this.getOnclickParams(e)
		},
		getBemParams: function(e) {
			var t, a = e.getAttribute("data-bem");
			try {
				t = JSON.parse(a)
			} catch(e) {
				t = {}
			}
			return t
		},
		getOnclickParams: function(e) {
			var t = "function" == typeof e.onclick && e.onclick() || {};
			return e.onclick = null, e.removeAttribute("onclick"), t
		}
	}), Ya.Site.Results || (Ya.Site.Results = function(p, h) {
		var r, u = p.location,
			e = "not_inited",
			m = Ya.Site,
			f = Ya.URL;

		function g(t, a) {
			var r = m.CheckVisibility.getWindowScroll()[1],
				i = 30,
				n = 10,
				s = r < a ? 1 : -1;
			! function e() {
				Math.abs(r - a) < i ? r = a : r += i * s, h.scrollTo(t, r), r !== a && setTimeout(e, n)
			}()
		}

		function i(e) {
			var t, a, r;
			e && (t = this, a = f.getHash(), (r = f.removeQueryParams(a, ["rpc"])) !== a && f.setHash(r, !0), t.node = e, t.buildParams(), null === t.params.text || null === t.params.searchid && null === t.params.clid || (t.searchId = t.params.searchid || t.params.clid, null === t.params.searchid && delete t.params.searchid, t.addOpensearch(), m.Form && m.Form.set(t.searchId, {
				text: t.params.text,
				web: t.params.web
			}), null !== t.params.htmlcss && "2068759" === t.searchId && (t.params.text += " <- s_available:1"), t.i18n_keyset = m.i18n[t.params.language]().external_frame, null !== t.params.htmlcss ? Ya.Site.loadJQuery(t.initHTML, t) : (f.onHashChange(function() {
				t.onHashChange()
			}), t.load()), i.instances.push(this)))
		}
		var t = i.prototype;
		return t.onHashChange = function() {
			var e, t, a, r;
			if(this.isSilentHashChange) this.isSilentHashChange = !1;
			else {
				if(e = !1, t = {}, (a = f.parseQuery(f.getHash())).rpc) return this.processRpcHashParam(a.rpc), delete a.rpc, void this.setSearchParams(a);
				for(r in i.hashParams) i.hashParams.hasOwnProperty(r) && (t[r] = this.params[r]);
				for(r in this.buildHashParams(a), i.hashParams)
					if(i.hashParams.hasOwnProperty(r) && this.params[r] !== t[r]) {
						e = !0;
						break
					}
				e && this.load()
			}
		}, t.processRpcHashParam = function(e) {
			return this.onIframeLoad().resizeIframe(parseInt(e, 10)).hideLoader(), this
		}, t.buildParams = function() {
			return this.params = {}, this.buildOnclickParams().buildQueryParams().buildHashParams(), this
		}, t.buildOnclickParams = function() {
			var e, t, a = Ya.Site.BemParams.extract(this.node);
			for(e in i.onclickParams) i.onclickParams.hasOwnProperty(e) && (void 0 !== (t = a[e]) && m.isValidParam(e, t) ? this.params[e] = t : this.params[e] = i.onclickParams[e]);
			return this
		}, t.buildQueryParams = function() {
			var e, t, a = m.queryParams;
			for(e in i.queryParams) i.queryParams.hasOwnProperty(e) && (t = a[e], m.isArray(t) && (t = t[0]), void 0 !== t && m.isValidParam(e, t) ? this.params[e] = t : this.params[e] = i.queryParams[e]);
			return this
		}, t.buildHashParams = function(e) {
			var t, a;
			for(t in e = e || f.parseQuery(f.getHash()), i.hashParams) i.hashParams.hasOwnProperty(t) && (a = e[t], m.isArray(a) && "constraintid" !== t && (a = a[0]), "noreask" === t && "1" !== a ? delete this.params[t] : void 0 !== a && m.isValidParam(t, a) ? this.params[t] = a : this.params[t] = i.hashParams[t]);
			return this
		}, t.createIframe = function() {
			var a = this;
			return a.rpc = new r.Rpc({
				remote: a.buildIframeURL(),
				container: this.node,
				swf: m.pathToJS() + "easyxdm.swf",
				local: u.protocol + "//" + u.host + u.pathname + u.search,
				onReady: function() {
					a.hideLoader()
				},
				onLoad: function() {
					a.hideLoader()
				},
				props: {
					style: {
						height: "0",
						width: "100%",
						minWidth: "300px",
						minHeight: "600px",
						margin: "0",
						borderWidth: "0"
					},
					frameBorder: "0",
					scrolling: "no",
					allowTransparency: "true"
				}
			}, {
				local: {
					resizeIframe: function(e) {
						a.resizeIframe(e)
					},
					setSearchParams: function(e, t) {
						a.setSearchParams(e, t)
					},
					onLoad: function(e) {
						a.onIframeLoad(e)
					},
					checkBlocksVisibility: function(e) {
						e && m.CheckVisibility.check(a.getIframeNode(), e, function(e) {
							a.rpc.checkedBlock(e)
						})
					}
				},
				remote: {
					checkedBlock: {}
				}
			}), a
		}, t.resizeIframe = function(e) {
			return this.getIframeNode().style.height = e + "px", this
		}, t.onIframeLoad = function(e) {
			var t = m.CheckVisibility.getWindowSize(),
				a = m.CheckVisibility.getWindowScroll(),
				r = m.CheckVisibility.getBlockOffset(this.getIframeNode());
			return(r[1] > t[1] + a[1] || r[1] < a[1]) && g(0, r[1]), e = e || {}, m.$(p).trigger("addOpensearch", e.opensearchTitle || u.hostname), e.counter && m.Metrika.addOrHit(parseInt(e.counter, 10)), this
		}, t.setSearchParams = function(e, t) {
			var a, r = f.buildQuery(e),
				i = f.getHash();
			this.buildHashParams(e), i !== r && (this.isSilentHashChange = !0, f.setHash(r, !0)), r = f.removeQueryParams(r, ["p", "surl", "how"]), m.Form && m.Form.set(this.searchId, {
				hash: r
			});
			try {
				"object" == typeof t && ((a = new Event("Ya.Site.Results.QueryParams")).data = JSON.stringify(t), h.dispatchEvent(a))
			} catch(e) {}
			return this
		}, t.getIframeNode = function() {
			return this.iframe || (this.iframe = this.node.getElementsByTagName("iframe")[0])
		}, t.load = function() {
			var t = this;
			return t.destroy().showLoader(), m.loadEasyXDM(function(e) {
				r = e, t.createIframe()
			}), t
		}, t.isSilentHashChange = !1, t.buildIframeURL = function() {
			for(var e, t = this.params.serp && "https:" + this.params.serp, a = m.pathToSerp(this.params.tld), r = (t || a) + "?", i = {
					text: this.params.text,
					web: this.params.web,
					l10n: this.params.language,
					frame: 1,
					v: m.VERSION
				}, n = ["searchid", "clid", "encoding", "p", "how", "surl", "constraintid", "date", "within", "from_day", "from_month", "from_year", "to_day", "to_month", "to_year", "noreask", "available", "priceLow", "priceHigh", "categoryId"], s = 0, o = n.length; s < o; ++s) e = n[s], this.params[e] && (i[e] = this.params[e], "surl" === e && (i.pug = "u"));
			return r + f.buildQuery(i)
		}, t.showLoader = function(e) {
			var t = "",
				t = (t += ".b-loader__paranja,.b-loader__paranja-iframe{position:absolute;top:0;left:0;width:100%;height:100%}.b-loader__paranja{background-color:#fff;opacity:.8;filter:alpha(opacity=80);z-index:998}.b-loader__paranja-iframe{opacity:0;filter:alpha(opacity=0);border:0}.b-loader__ext-wrapper{position:absolute;top:0;left:0;width:97%;background-color:#fff;z-index:999;padding:20px 0 20px 3%}#ya-site-results .results__loading{min-height:80px}.b-loader__wrapper{color:inherit!important;width:auto;height:3em;padding:.5em 0 0}.b-loader__progress{width:100%;height:1em;background:{{BGURL}} repeat-x}").replace(/{{BGURL}}/, "url(" + m.pathToImages() + "loader__progress.gif) ");
			return Ya.Site.appendToHead({
				tag: "style",
				innerHTML: t
			}), this.loader || (this.loader = p.createElement("div"), this.loader.innerHTML = '<table class="b-loader__wrapper"><tr><td>' + this.i18n("loading_results") + '<div class="b-loader__progress"></div></td></tr></table>'), this.extWrapper ? (this.extWrapper.className = "results__loading", this.loader.className = "b-loader__ext-wrapper", this.extWrapper.insertBefore(this.loader, this.extWrapper.firstChild), e && (this.paranja || (this.paranja = p.createElement("div"), this.paranja.className = "b-loader__paranja", this.paranja.innerHTML = '<iframe class="b-loader__paranja-iframe"></iframe>'), this.extWrapper.insertBefore(this.paranja, this.extWrapper.firstChild))) : this.node.appendChild(this.loader), this
		}, t.hideLoader = function() {
			return this.extWrapper && (this.extWrapper.className = ""), this.paranja && this.paranja.parentNode && this.paranja.parentNode.removeChild(this.paranja), this.loader && this.loader.parentNode && this.loader.parentNode.removeChild(this.loader), this
		}, t.destroy = function() {
			return this.rpc && this.rpc.destroy(), this.iframe = null, this
		}, t.i18n = function(e) {
			var t = this.i18n_keyset[e],
				a = Array.prototype.slice.call(arguments, 1);
			return t.apply(h, a)
		}, t.prepareSerpUrlToHash = function(e) {
			var t = i.getKeysFromObjects([i.onclickParams, i.queryParams]).concat(["topdoc", "html", "l10n"]),
				a = new RegExp("(^|&)[a-z_]+=(?=(&|$))", "gi");
			return f.removeQueryParams(e, t).replace(a, "").replace(/^&/, "")
		}, t.initHTML = function() {
			var c, l = this,
				e = encodeURIComponent(h.location.protocol + "//" + h.location.host + h.location.pathname + h.location.search),
				t = p.createElement("div"),
				u = l.node,
				d = "callback";
			Ya.Site.$ && ((c = Ya.Site.$)(u).empty(), t.style.position = "relative", l.node.appendChild(t), l.extWrapper = l.node.firstChild, l.fetchingInProgress = !1, l.showLoader(!0), c(u).bind("Ya.site-get-results", function(e, t) {
				var a, r, i = m.CheckVisibility.getWindowSize(),
					n = m.CheckVisibility.getWindowScroll(),
					s = m.CheckVisibility.getBlockOffset(u),
					o = p.createElement("a");
				l.fetchingInProgress || (l.fetchingInProgress = !0, t.url = f.removeQueryParams(t.url, ["language", "l10n"]) + "&l10n=" + l.params.language, a = m.pathToSerp(l.params.tld) + f.removeQueryParams(t.url, ["spravka"]) + (m.Cookies.has("yass_spravka") ? "&spravka=" + encodeURIComponent(m.Cookies.get("yass_spravka")) : ""), o.setAttribute("href", t.url), r = l.prepareSerpUrlToHash(o.search.substr(1)), !0 === l.params.updatehash && f.setHash(r), l.buildHashParams(f.parseQuery(r)), r = f.removeQueryParams(r, ["p", "surl", "how"]), m.Form && m.Form.set(l.searchId, {
					hash: r
				}), l.loader && l.loader.parentNode || l.showLoader(!0), (s[1] > i[1] + n[1] || s[1] < n[1]) && g(0, s[1]), t && t.url && c.ajax({
					url: a,
					dataType: "jsonp",
					jsonp: d,
					success: function(e) {
						d = "callback", e && e.type && "captcha" === e.type ? Ya.Site.Captcha.render({
							results: l,
							dataReceived: e,
							dataToGetResults: t
						}) : (e && e.error && (d = "lol", l.fetchingInProgress = !1, c(u).trigger("Ya.site-get-results", t)), e && e.url && m.Results.triggerResultsDelivered(e))
					}
				}))
			}), c(u).bind("Ya.site-results-delivered", function(e, t) {
				l.loadHTML(t)
			}), c(u).bind("Ya.site-results-show", function() {
				l.hideLoader(), l.initSaasCounters(this), l.loader.parentNode && delete l.loader, c(u).find(".b-wrapper").css({
					display: "block"
				})
			}), m.appendToHead({
				tag: "script",
				source: m.pathToSerpStatic() + "search-htmlcss/_wrapper.js",
				callback: function() {
					c(u).trigger("Ya.site-get-results", {
						url: "?html=1&topdoc=" + e + "&" + f.removeQueryParams(f.buildQuery(l.params), ["how"])
					})
				}
			}))
		}, t.loadHTML = function(n) {
			var s, o = this,
				c = o.node,
				l = o.extWrapper;
			(function(e, r) {
				function t(t) {
					var e, a = t.elem.data(t.attrName);
					if(void 0 === a || "1.4.2" === r.fn.jquery && null === a)
						if(e = t.elem.attr("data-" + t.attrName), t.isString && void 0 !== e) a = e;
						else try {
							a = JSON && JSON.parse && JSON.parse(t.elem.attr("data-" + t.attrName)) || t.defaultValue
						} catch(e) {
							a = t.defaultValue
						}
						return a
				}
				var a, i;
				r(l).find(".b-wrapper").remove(), l.innerHTML += n, o.loader = l.childNodes[0], o.paranja && (o.paranja = o.loader, o.loader = l.childNodes[1]), "function" != typeof r(".b-wrapper")[0].onclick && r(".b-wrapper .i-bem").each(function() {
					var e = r(this)[0];
					e.onclick = new Function(e.getAttribute("onclick"))
				}), (i = r)(".b-serp-item__image-snippet").each(function() {
					var e = i(this),
						t = p.createElement("img");
					t.src = e.css("background-image").replace(/^url\(['"]?([^'"]*)['"]?\).*$/, "$1"), i(t).bind("error", function() {
						e.parent(".b-serp-item").removeClass("b-serp-item_media_image b-serp-item_media_video").end().remove()
					})
				}), i("yass-div.b-bottom-wizard yass-div.b-footer").remove(), BEM.DOM.init(), Lego.init(t({
					elem: r(".b-page__js-lego"),
					attrName: "lego",
					defaultValue: {
						id: "sitesearch"
					}
				})), Report = t({
					elem: r(".b-page__js-report"),
					attrName: "report"
				}), a = t({
					elem: r(".b-page__opensearch"),
					attrName: "opensearch"
				}), r(".b-statcounter__pps-metrika").each(function(e, t) {
					var a = Ya.Site.BemParams.extract(t);
					a && m.Metrika.addOrHit(parseInt(a, 10))
				}), r(p).trigger("addOpensearch", a && a.title || u.hostname), Lego.blockInit(), s = t({
					elem: r(".b-page__user-style-css"),
					attrName: "user-style-css",
					isString: !0
				}), Ya.Site.appendToHead({
					tag: "style",
					innerHTML: s
				}), r(c).trigger("Ya.site-results-show"), o.fetchingInProgress = !1, h.$ && h.$.fn && h.$.fn.trigger && "function" == typeof h.$.fn.trigger && h.$(p).trigger("yass.ready")
			}).call(o, h, Ya.Site.$)
		}, t.addOpensearch = function() {
			return Ya.Site.pushOpensearch({
				SERP: !0,
				sid: this.searchId,
				useClid: !this.params.searchid && this.params.clid,
				web: this.params.web,
				lang: this.params.language,
				tld: this.params.tld,
				delayed: !0
			}), this
		}, t.initSaasCounters = function(e) {
			Ya.Site.$(e).find(".b-serp-item__title").each(function() {
				var e = Ya.Site.$(this),
					t = Ya.Site.BemParams.extract(this),
					a = t && t["b-serp-item__title"],
					r = a && a.saasClickUrl;
				"string" == typeof r && e.bind("mousedown", function() {
					"function" == typeof h.r && h.r(null, r)
				})
			})
		}, i.getKeysFromObjects = function(e) {
			for(var t, a = []; e.length;)
				for(var r in t = e.pop()) t.hasOwnProperty(r) && a.push(r);
			return a
		}, i.onclickParams = {
			encoding: "",
			language: "ru",
			tld: "ru",
			htmlcss: null,
			updatehash: !1
		}, i.queryParams = {
			searchid: null,
			clid: null,
			text: null,
			web: "0"
		}, i.hashParams = {
			p: null,
			how: null,
			surl: null,
			constraintid: null,
			date: null,
			within: null,
			from_day: null,
			from_month: null,
			from_year: null,
			to_day: null,
			to_month: null,
			to_year: null,
			noreask: "0",
			available: null,
			priceLow: null,
			priceHigh: null,
			categoryId: null
		}, i.instances = [], {
			init: function() {
				"inited" !== e && (new i(p.getElementById("ya-site-results")), e = "inited")
			},
			triggerResultsDelivered: function(e) {
				Ya.Site.$ && Ya.Site.$("#ya-site-results").trigger("Ya.site-results-delivered", e)
			}
		}
	}(document, window)), Ya.Site.CheckVisibility || (Ya.Site.CheckVisibility = function(e, o) {
		var c, l, u, t = "CSS1Compat",
			d = "resize",
			p = "load",
			h = "scroll",
			a = "clientWidth",
			r = "clientHeight",
			i = "scrollLeft",
			n = "scrollTop",
			s = e.documentElement,
			m = !1,
			f = Ya.Site;

		function g() {
			return [e.compatMode === t && s[a] || e.body[a] || 0, e.compatMode === t && s[r] || e.body[r] || 0]
		}

		function b() {
			return [o.pageXOffset || s[i] || e.body[i] || 0, o.pageYOffset || s[n] || e.body[n] || 0]
		}

		function _(e) {
			for(var t = 0, a = 0; e;) t += parseInt(e.offsetLeft, 10), a += parseInt(e.offsetTop, 10), e = e.offsetParent;
			return [t, a]
		}

		function y() {
			var e, t, a, r, i = _(l),
				n = 0;
			for(var s in c) {
				c.hasOwnProperty(s) && (e = c[s], t = [e[0] + i[0], e[1] + i[1], e[2], e[3]], r = a = void 0, a = g(), r = b(), t[0] + t[2] >= r[0] && t[0] < r[0] + a[0] && t[1] + t[3] >= r[1] && t[1] < r[1] + a[1] ? ("function" == typeof u && u(s), delete c[s]) : ++n)
			}
			0 === n && (f.removeEvent(o, h, y), f.removeEvent(o, d, y), f.removeEvent(o, p, y), m = !1)
		}
		return {
			check: function(e, t, a) {
				l = e, c = t, u = a, m || (f.addEvent(o, h, y), f.addEvent(o, d, y), f.addEvent(o, p, y), m = !0), y()
			},
			getWindowSize: g,
			getWindowScroll: b,
			getBlockOffset: _
		}
	}(document, window)), Ya.Site.Iframe || (Ya.Site.Iframe = function(i, n) {
		var a, e, t, r = "not_inited",
			s = Ya.Site,
			o = s.queryParams,
			c = ["p", "how", "surl", "constraintid", "date", "within", "from_day", "from_month", "from_year", "to_day", "to_month", "to_year", "noreask", "available", "priceLow", "priceHigh", "categoryId"],
			l = {},
			u = {
				length: 0
			};

		function d() {
			return i.documentElement && i.documentElement.scrollHeight || i.body.scrollHeight || 0
		}

		function p(e, t) {
			u[e] = t, ++u.length
		}
		return {
			init: function() {
				if("inited" !== r) {
					if(n.parent === n) return;
					for(n.direct_check_visibility = p, e = 0, t = c.length; e < t; ++e) o.hasOwnProperty(c[e]) && (l[c[e]] = o[c[e]]);
					s.loadEasyXDM(function(e) {
						a = e,
							function() {
								if("0" === a.query.xdm_p) return s.addEvent(n, "load", function() {
									l.rpc = d(), n.parent.location.replace(a.query.xdm_e + "#" + Ya.URL.buildQuery(l)), n.focus()
								});
								var t = new a.Rpc({
									swf: s.pathToJS() + "easyxdm.swf",
									onReady: function() {
										n.focus();
										var a, r, e = (e = $(".b-statcounter__pps-metrika:eq(0)")[0]) ? Ya.Site.BemParams.extract(e) : void 0;
										t.onLoad({
												opensearchTitle: $("link[rel=search]").attr("title"),
												counter: e
											}), a = t,
											function e() {
												var t = d();
												t !== r && (a.resizeIframe(t), r = t), setTimeout(e, 500)
											}(), u.length && t.checkBlocksVisibility(function() {
												var e, t, a, r = {};
												for(e in u) u.hasOwnProperty(e) && "length" !== e && (t = i.getElementById(e)) && (a = s.CheckVisibility.getBlockOffset(t), r[e] = [a[0], a[1], t.clientWidth, t.clientHeight]);
												return r
											}()), t.setSearchParams(l, o)
									}
								}, {
									local: {
										checkedBlock: function(e) {
											u.hasOwnProperty(e) && s.loadJS(u[e])
										}
									},
									remote: {
										onLoad: {},
										resizeIframe: {},
										setSearchParams: {},
										checkBlocksVisibility: {}
									}
								})
							}()
					}), r = "inited"
				}
			}
		}
	}(document, window)),
	function(e) {
		var t = e.yandex_site_callbacks;
		if(t)
			for(; t.length;) t.shift()();
		e.yandex_site_callbacks = null
	}(window);