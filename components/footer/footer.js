import Link from "next/link";

export default function Footer() {
	return (
		<footer className="footer-container">
			<div id="map" className="footer-map-block">MAP</div>
			<div className="footer-navigation-block">
				<p className="footer-title">Навигация</p>
				<ul className="footer-menu-list">
					<li>
						<Link href="/home">
                            <a>Главная</a>
                        </Link>
					</li>
					<li>
						<Link href="/about">
                            <a>О нас</a>
                        </Link>
					</li>
					<li>
						<Link href="/gallery">
                            <a>Галерея</a>
                        </Link>
					</li>
					<li>
						<Link href="/services">
                            <a>Услуги и аренда</a>
                        </Link>
					</li>
					<li>
						<Link href="/events">
                            <a>Мероприятия</a>
                        </Link>
					</li>
					<li>
						<Link href="/news">
                            <a>Новости</a>
                        </Link>
					</li>
					<li>
						<Link href="/contacts">
                            <a>Контакты</a>
                        </Link>
					</li>
					<li>
						{/* Wtf */}
						<a href="!!privacy">Политика конфиденциальности</a>
					</li>
				</ul>
			</div>
			<div className="footer-contacts-block">
				<p className="footer-title">Контакты</p>
				<div className="footer-contacts-wrapper">
					<div className="phone">
						<a href="tel:+4950000000" className="title-contacts">+495 000 00 00</a>
						<p className="sub-contacts">Телефон</p>
					</div>
					<div className="email">
						<a href="mailto:vivat@gmail.com" className="title-contacts">vivat@gmail.com</a>
						<p className="sub-contacts">Email</p>
					</div>
					<div className="address">
						<a href="!!address" className="title-contacts">г.Москва, Замечательный проезд 1</a>
						<p className="sub-contacts">Адрес</p>
					</div>
					<div className="time">
						<p className="title-contacts">ПН-ВС 10:00 - 20:00</p>
						<p className="sub-contacts">Время работы</p>
					</div>
				</div>
			</div>
			<div className="footer-row flex-row">
				<div className="footer-copyright">
					<p>&copy; КСК "Виват, Россия!"&nbsp;<span>2020</span>&nbsp;all rights reserved</p>
				</div>
				<div className="footer-developer">
					<p>Designed and template by&nbsp;<a href="!!easyweb">EasyWeb Studio</a></p>
				</div>
			</div>
		</footer>
	);
}