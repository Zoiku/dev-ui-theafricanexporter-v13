import AxiosInstance from "./AxiosInstance";
import { JSEncrypt } from "jsencrypt";
import decode from "jwt-decode";

const setSessionToken = (token) => {
  sessionStorage.setItem("token", token);
};

export default class AuthService {
  async isLoggedBefore(id) {
    let errors = [];
    const url = `/user/logged/${id}`;

    try {
      await AxiosInstance().post(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async register(payload) {
    let errors = [];
    const url = "/users";

    try {
      await AxiosInstance().post(url, JSON.stringify(payload));
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async signIn(payload) {
    const rsaPublicKey =
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiif1u5RTSyv0B+qx0SNvFjQjPwnSQpFxSMRQ3sMfYZ9U0+vr0GLZDu4wXedO1WMxbTNGEzDGBK1+OwhRxJtJxF8JZEcaoVpahVfFfkn9df+m5zusOySpJ+xcoTRPIhQq6ZFeT3/jleClT6q0OVJqm4Rs/deSym9agaMWK9ck0mwIDAQAB";
    const encrypt = new JSEncrypt(rsaPublicKey);
    encrypt.setPublicKey(rsaPublicKey);
    const encrypted = encrypt.encrypt(JSON.stringify(payload));

    let errors = [];
    let data = null;
    const url = "/user/token";

    try {
      data = await AxiosInstance().post(url, { data: encrypted });
      setSessionToken(data.data.token);
    } catch (error) {
      errors.push(error?.response?.data?.message);
    }

    return {
      errors,
      data
    };
  }

  async verifyCode(otp, email, role) {
    let errors = [];
    const url = `/opt/verify/${otp.toUpperCase()}?email=${email}&role=${role}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async resendVerificationCode(email) {
    let errors = [];
    const url = `/opt/resend/${email}`;

    try {
      await AxiosInstance().post(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async getUserProfile(signal) {
    let errors = [];
    let data = {};
    const url = "/user";

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async sendResetPasswordLink(email) {
    let errors = [];
    let data = {};
    const url = `/user/password/${email}`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async verifyToken(token) {
    return decode(token);
  }

  async submitNewPassword(email, password) {
    let errors = [];
    let data = {};
    const url = `/user/password/new/${email}`;

    try {
      data = await AxiosInstance().post(url, {
        password: password
      });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }
}
