export interface LinkApi {
    saveLink(...args);
    getLink(...args);
    getLinkByUUID(...args);
    changeLinkStatus(...args);
    removeLink(...args);
}