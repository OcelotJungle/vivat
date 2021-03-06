import { DefaultErrorModal, ErrorModal, SuccessModal } from "./Modals";
import AuthProvider from "../../utils/providers/AuthProvider";
import MailProvider from "../../utils/providers/MailProvider";
import { toRuDate } from "../../utils/common";
import DatePicker from "./DatePicker";
import Select from 'react-select';
import { useState } from "react";

const DO_LOG = false;

const selectValuer = value => ({ value, label: value });
const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"].map(selectValuer);
const minutes = ["00", "10", "20", "30", "40", "50"].map(selectValuer);

export default function Rent({ text, cost, minHours, hoursText }) {
    const [successModal, setSuccessModal] = useState(false);
    const [timeErrorModal, setTimeErrorModal] = useState(false);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedFromHour, setSelectedFromHour] = useState(hours[0]);
    const [selectedToHour, setSelectedToHour] = useState(hours[2]);
    const [selectedFromMinute, setSelectedFromMinute] = useState(minutes[0]);
    const [selectedToMinute, setSelectedToMinute] = useState(minutes[0]);

    const submit = async () => {
        const time = {
            from: {
                hour: selectedFromHour.value,
                minute: selectedFromMinute.value,
                timestamp: +selectedFromHour.value * 60 + +selectedFromMinute.value
            },
            to: {
                hour: selectedToHour.value,
                minute: selectedToMinute.value,
                timestamp: +selectedToHour.value * 60 + +selectedToMinute.value
            }
        };

        if(time.to.timestamp - time.from.timestamp < minHours * 60) return setTimeErrorModal(true);
        const fromTime = `${time.from.hour}:${time.from.minute}`;
        const toTime = `${time.to.hour}:${time.to.minute}`;
        
        const email = AuthProvider.userData.email;
        const phone = AuthProvider.userData.phone;
        DO_LOG && console.log(email, phone, text, fromTime, toTime, toRuDate(selectedDate));

        try {
            const result = await MailProvider.sendRentEmail(email, phone, text, fromTime, toTime, toRuDate(selectedDate));
            if(result.success) setSuccessModal(true);
            else {
                setDefaultErrorModal(true);
                console.error({ result });
            }
        } catch(e) {
            setDefaultErrorModal(true);
            console.error(e);
        }
    };

    return (<>
        <div className="order-service-wrapper content-block">
            <div className="order-service-block">
                <div className="order-service-title-wrapper">
                    <h2 className="order-service-title">{ text }</h2>
                </div>
                <div className="order-service-price-wrapper">
                    <div className="order-service-price-title">Стоимость</div>
                    <div className="order-service-price-amount">{ cost }р/ч</div>
                </div>
                <div className="order-service-day-wrapper">
                    <div className="order-service-day-title">Выбор дня</div>
                    <div className="order-service-day-datepicker">
                        <DatePicker
                            selected={selectedDate} onChange={setSelectedDate}
                            dateFormat="dd.MM.yyyy" dropdownMode="select"
                            showYearDropdown peekNextMonth
                        />
                    </div>
                </div>
                <div className="order-service-time-wrapper">
                    <div className="order-service-time-title">Выбор времени</div>
                    <div className="order-service-time-select">
                        <div className="time-select-from">
                            <Select value={selectedFromHour} onChange={setSelectedFromHour} options={hours} />
                            :
                            <Select value={selectedFromMinute} onChange={setSelectedFromMinute} options={minutes} />
                        </div>
                        <div className="time-select-to">
                            <Select value={selectedToHour} onChange={setSelectedToHour} options={hours} />
                            :
                            <Select value={selectedToMinute} onChange={setSelectedToMinute} options={minutes} />
                        </div>
                    </div>
                </div>
                <div className="order-service-mintime-wrapper">
                    <div className="order-service-mintime-title">Минимальное время аренды</div>
                    <div className="order-service-mintime-time">{ minHours } { hoursText }</div>
                </div>
                <div className="order-service-button-wrapper">
                    <button className="order-service-button" onClick={submit}>Заказать</button>
                </div>
            </div>
        </div>
        <SuccessModal
            content="Успешная аренда, с вами свяжутся для уточнения деталей."
            opened={successModal} close={() => setSuccessModal(false)}
        />
        <ErrorModal
            opened={timeErrorModal} close={() => setTimeErrorModal(false)}
            content="Длительность аренды не может быть менее двух часов."
        />
        <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
    </>);
}