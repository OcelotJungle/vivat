import ProfileMenu from "../../components/common/ProfileMenu";
import Select from "react-select";
import AuthProvider, { AuthVariableComponent, useAuth } from "../../utils/providers/AuthProvider";
import EventListProvider from "../../utils/providers/EventListProvider";
import { currentISODate } from "../../utils/common";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import makeAnimated from "react-select/animated";
// import { css, cx } from "@emotion/css";

const categoryOptions = [
    { value: "chocolate", label: "Скачки белых лошадей" },
    { value: "strawberry", label: "Гарцующий пони" },
    { value: "vanilla", label: "Самые быстрые скакуны" },
    { value: "vanilla", label: "Самая длинная грива" }
]

const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};

const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
};
  
const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);


export default function Registration() {
    const [events, setEvents] = useState();
    const [user, setUser] = useState(useAuth());
    useEffect(() => {
        const interval = setInterval(() => setUser(useAuth()), 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(async () => {
        if(!user) return;

        const currentDate = currentISODate();

        let events;
        try { events = await EventListProvider.getEventList(); }
        catch(e) { return console.log("wtf, where is an event list"); }
        console.log("Events", events);
        
        const dateFilteredEvents = events.filter(event => event.dates[0] > currentDate);
        console.log("Date filtered events", dateFilteredEvents);

        const idFilteredEvents = dateFilteredEvents.filter(({ id }) => !user.events.some(({ event_id }) => id === event_id ));
        console.log("ID filtered events", idFilteredEvents);
        
        const mappedEvents = idFilteredEvents.map(({ id, title }) => ({ value: id, label: title }));
        console.log("Mapped events", mappedEvents);
        
        setEvents(mappedEvents);
    }, [user]);

    const refs = {
        event_id: useRef(),
        rider: {
            name: useRef(),
            birthdate: useRef()
        },
        region: useRef(),
        trainer_name: useRef(),
        delegate_phone: useRef(),
        horse: {
            nickname: useRef(),
            birthyear: useRef(),
            sex: useRef()
        },
        fskr: {
            passport: useRef(),
            number: useRef()
        },
        wait_needed: useRef()
    };

    const crawl = () => ({
        event_id: refs.event_id.current,
        rider: {
            name: refs.rider.name.current.value,
            birthdate: refs.rider.birthdate.current.value
        },
        region: refs.region.current.value,
        trainer_name: refs.trainer_name.current.value,
        delegate_phone: refs.delegate_phone.current.value,
        horse: {
            nickname: refs.horse.nickname.current.value,
            birthyear: refs.horse.birthyear.current.value,
            sex: refs.horse.sex.current.checked ? "male" : "female"
        },
        fskr: {
            passport: refs.fskr.passport.current.value,
            number: refs.fskr.number.current.value
        },
        wait_needed: refs.wait_needed.current.checked ? true : false
    });

    const submit = async () => {
        const result = await AuthProvider.registerToEvent(crawl());
        if(result.success) {
            alert("Успешная регистрация на мероприятие");
            Router.push("/account/my-events");
        } else alert("Что-то пошло не так, повторите попытку позже");
    };

    const [startDate, setStartDate] = useState(new Date());

    return (
        <AuthVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="registration" />
                <div className="block-title">
                    <h2 onClick={() => console.log(crawl())}>Регистрация на событие</h2>
                </div>
                <div className="registration-content">
                    <div className="left-column">
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Выбор события</p>
                            { events && (<Select
                                defaultValue={events[0]}
                                options={events}
                                formatGroupLabel={formatGroupLabel}
                                theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                                placeholder="Выберите из списка"
                                onChange={({ value: id }) => { refs.event_id.current = id }}
                            />) }
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">ФИО всадника</p>
                            <input ref={refs.rider.name} type="text" className="registration-element-input" placeholder="Иванов Иван Иванович" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Дата рождения всадника</p>
                            {/* <input ref={refs.rider.birthdate} type="text" className="datepicker-here registration-element-input " placeholder="11.02.1996" /> */}
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)}
                            />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Страна/регион</p>
                            <input ref={refs.region} type="text" className="registration-element-input" placeholder="Россия, Москва" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">ФИО тренера</p>
                            <input ref={refs.trainer_name} type="text" className="registration-element-input" placeholder="Иванов Иван Иванович" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Контакты представителя</p>
                            <input ref={refs.delegate_phone} type="text" className="registration-element-input" placeholder="+7(926) 000 00 00" />
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Кличка лошади</p>
                            <input ref={refs.horse.nickname} type="text" className="registration-element-input" placeholder={"Конак" || "Плотва" } />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Год рождения лошади</p>
                            <input ref={refs.horse.birthyear} type="text" className="registration-element-input" placeholder="1996" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Пол лошади</p>
                            <input ref={refs.horse.sex} type="radio" name="sex" id="male" className="custom-checkbox" defaultChecked={true} />
                            <label className="gender-input" htmlFor="male">
                                М
                            </label>
                            <input type="radio" name="sex" id="female" className="custom-checkbox" />
                            <label className="gender-input" htmlFor="female">
                                Ж
                            </label>
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Паспорт ФСКР</p>
                            <input ref={refs.fskr.passport} type="text" className="registration-element-input" placeholder="20090867" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Номер ФСКР</p>
                            <input ref={refs.fskr.number} type="text" className="registration-element-input" placeholder="4221" />
                        </div>
                        <div className="registration-element">
                            <span className="required">*</span>
                            <p className="registration-element-title">Нужен постой</p>
                            <input ref={refs.wait_needed} type="radio" name="wait" id="wait_yes" className="custom-checkbox" defaultChecked={true} />
                            <label className="gender-input" htmlFor="wait_yes">
                                Да
                            </label>
                            <input type="radio" name="wait" id="wait_no" className="custom-checkbox" />
                            <label className="gender-input" htmlFor="wait_no">
                                Нет
                            </label>
                        </div>
                        <div className="registration-element" style={{ display: "none" }}>
                            <span className="required">*</span>
                            <p className="registration-element-title">C кормом</p>
                            <input type="checkbox" id="male" className="custom-checkbox" />
                            <label className="gender-input" htmlFor="male">
                                Да
                            </label>
                            <input type="checkbox" id="female" className="custom-checkbox" />
                            <label className="gender-input" htmlFor="female">
                                Нет
                            </label>
                        </div>
                    </div>
                </div>
                <div className="registration-row flex-row">
                    <button className="registration-button" onClick={submit}>Зарегистрировать</button>
                </div>
            </div>
            <div />
        </AuthVariableComponent>
    );
}