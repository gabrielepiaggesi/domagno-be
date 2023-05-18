export interface LinkApi {
    saveLink(...args);
    getLinkByAssignmentID(...args);
    getLinkByUUID(...args);
    getLinkByID(...args);
    changeLinkStatus(...args);
    removeLink(...args);
    sendFiles(...args);
    activeLink(...args);
}