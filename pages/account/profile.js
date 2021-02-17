import Link from "next/link";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileMenu from "../../components/common/ProfileMenu";
import { reformatDate } from "../../utils/common";
import AuthProvider, { useAuth, AuthVariableComponent } from "../../utils/providers/AuthProvider";

export default withRouter(_Profile);

function _Profile({ router }) {
    const [content, setContent] = useState(null);
    useEffect(async () => {
        if(!router.isReady) return;

        const { verify_email, email, uuid } = router.query;
        if(!verify_email) { setContent(<Profile />); return; }

        const result = await AuthProvider.verifyEmail(email, uuid );
        console.log(result);
        if(result.success) {
            await AuthProvider.refreshTokens();
            setContent(<Profile />);
        } else {
            console.error(result.reason);
            alert("Ссылка подтверждения недействительна");
            router.push("/home");
        }
    }, [router.isReady]);

    return content ?? null;
}

function Profile() {
    const [user, setUser] = useState(useAuth());
    useEffect(() => {
        const interval = setInterval(() => setUser(useAuth()), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="profile" />
                <div className="profile-row flex-row">
                    <div className="personal-wrapper">
                        <div className="profile-photo-wrapper">
                            { /* why can't someone just rename files? */ }
                            <img src="/images/profile/114296480-businessman-avatar-icon-profession-logo-male-character-a-man-in-suit-people-specialists-flat-simple-.jpg" alt="" width="100%" />
                        </div>
                        <div className="profile-name">
                            <p className="name-p">{
                                user && (({ second, first, middle }) => `${second} ${first} ${middle}`)(user.name)
                            }</p>
                            <p className="state-p"><span>RU</span>, <span>Moscow</span></p>
                        </div>
                    </div>
                    <div className="end-profile-wrapper">
                        <button className="login-button" onClick={() => AuthProvider.deauthenticate()}>Выход</button>
                    </div>
                </div>
                <div className="profile-row flex-row">
                    <div className="profile-element-wrapper">
                        <p className="birthday-title">Дата рождения:</p>
                        <p className="birthday-data">{ user && reformatDate(user.birthdate) }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="email-title">email:</p>
                        <p className="email-data">{ user && user.email }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="phone-title">Номер телефон:</p>
                        <p className="phone-data">{ user && user.phone }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="address-title">Адрес</p>
                        <p className="address-data">{ user && user.address }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="gender-title">Пол:</p>
                        <p className="gender-data">{ user && (user.sex === "male" ? "Мужской" : "Женский") }</p>
                    </div>
                </div>
                <div className="profile-row flex-row">
                    <div className="change-button-wrapper">
                        <Link href="/account/change">
                            <a> 
                                <button className="change-button">Изменить</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div />
        </AuthVariableComponent>
    );
}