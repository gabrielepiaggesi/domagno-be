import { Assignment } from "../../utils/Assignment";
import { LOG } from "../../utils/Log";
import { RandomID } from "../../utils/RandomID";
import { ServerError } from "../../utils/ServerError";
import { LinkApi } from "../apis/LinkApi";
import { LinkStatus } from "../enums/LinkStatus.enum";
import { Link } from "../models/Link";
import { LinkRepository } from "../repositories/LinkRepository";

const linkRepository = new LinkRepository();

export class LinkService implements LinkApi {

    public async getLinkByAssignmentID(assignmentId: number) {
        return await linkRepository.findOneByKeyValue('assignmentId', assignmentId);
    }

    public async getLinkByUUID(linkUUID: string) {
        return await linkRepository.findOneByKeyValue('uuid', linkUUID);
    }

    public async getLinkByID(linkID: string) {
        return await linkRepository.findById(linkID);
    }
    
    public async saveLink(assignmentId: number) {
        const equalLink = await this.getLinkByAssignmentID(assignmentId);
        if (equalLink) {
            LOG.warn('Cannot save link, returning equal one', assignmentId, equalLink._id);
            return equalLink;
        }
        
        const newLink = new Link();
        newLink.uuid = RandomID.generate();
        newLink.status = LinkStatus.Active;
        newLink.assignmentId = assignmentId;
        const linkSaved = await linkRepository.save(newLink);
        newLink._id = linkSaved.insertedId;

        LOG.success('New link saved', newLink.uuid, newLink._id);
        return newLink;
    }

    public async sendFiles(linkID: string, token: string) {
        const link = await linkRepository.findById(linkID);
        this.changeLinkStatus(linkID, 'inactive');
        return await Assignment.toggleAttesa(link.assignmentId, true, token);
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