import { LOG } from "../../utils/Log";
import { ServerError } from "../../utils/ServerError";
import { LinkApi } from "../apis/LinkApi";
import { LinkStatus } from "../enums/LinkStatus.enum";
import { Link } from "../models/Link";
import { LinkRepository } from "../repositories/LinkRepository";

const linkRepository = new LinkRepository();

export class LinkService implements LinkApi {

    public async getLink(linkUUID: string) {
        return await linkRepository.findOneByKeyValue('uuid', linkUUID);
    }
    
    public async saveLink(linkData: { uuid: string, assignmentId: number }) {
        const equalLink = await this.getLink(linkData.uuid);
        if (equalLink) {
            LOG.warn('Cannot save link, returning equal one', linkData.uuid, equalLink._id);
            return equalLink;
        }
        
        const newLink = new Link();
        newLink.uuid = linkData.uuid;
        newLink.status = LinkStatus.Active;
        newLink.assignmentId = linkData.assignmentId;
        const linkSaved = await linkRepository.save(newLink);
        newLink._id = linkSaved.insertedId;

        LOG.success('New link saved', newLink.uuid, newLink._id);
        return newLink;
    }

    public async changeLinkStatus(linkID: string, status: any) {
        LOG.info('Changing link status to', status, linkID);
        const newStatus = LinkStatus[status];
        if (!newStatus) throw new ServerError('WRONG_LINK_STATUS');
        return await linkRepository.updateStatus(linkID, newStatus);
    }

    public async removeLink(linkID: string) {
        LOG.info('Removing link', linkID);
        return await linkRepository.delete(linkID);
    }

}