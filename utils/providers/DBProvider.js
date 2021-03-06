import { isServer } from "../common";

export default class DBProvider {
    static createPromise(_url, defaultValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = isServer() ? `https://localhost${_url}` : _url;
                const response = await fetch(url);
                const json = await response.json();
                resolve(json);
            } catch(e) { console.error(e); reject(defaultValue) }
        });
    }

    static getArrayPromise = address => this.createPromise(`/api/${address}`, []);
    static getAlbumList = () => this.getArrayPromise("albums");
    static getEventList = () => this.getArrayPromise("events");
    static getPostList = (params = "") => this.getArrayPromise(`posts${params}`);
    static getEventStats = () => this.getObjectPromise(`events/stats`);
    static getAlbumStats = () => this.getObjectPromise(`albums/stats`);
    static getPostStats = () => this.getObjectPromise(`posts/stats`);

    static getObjectPromise = address => this.createPromise(`/api/${address}`, {});
    static getAlbumDetails = id => this.getObjectPromise(`albums/${id}`);
    static getEventDetails = id => this.getObjectPromise(`events/${id}`);
    static getPostDetails = id => this.getObjectPromise(`posts/${id}`);
}