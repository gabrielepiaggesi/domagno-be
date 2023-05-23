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
        const link = await linkRepository.findOneByKeyValue('assignmentId', assignmentId);
        delete link.assignmentId;
        return link;
    }

    public async getLinkByUUID(linkUUID: string) {
        const link = await linkRepository.findOneByKeyValue('uuid', linkUUID);
        delete link.assignmentId;
        return link;
    }

    public async getLinkByID(linkID: string, fromInternal = false) {
        const link = await linkRepository.findById(linkID);
        if (!fromInternal) delete link.assignmentId;
        return link;
    }
    
    public async saveLink(assignmentId: number) {
        const equalLink = await this.getLinkByAssignmentID(assignmentId);
        if (equalLink) {
            LOG.warn('Cannot save link, returning equal one', assignmentId, equalLink._id);
            return equalLink;
        }
        
        const newLink = new Link();
        newLink.uuid = RandomID.generate();
        newLink.status = "inactive";
        newLink.assignmentId = assignmentId;
        const linkSaved = await linkRepository.save(newLink);
        newLink._id = linkSaved.insertedId;

        LOG.success('New link saved', newLink.uuid, newLink._id);
        return newLink;
    }

    public async sendFiles(linkID: string, token: string) {
        const link = await linkRepository.findById(linkID);
        const assignmentRes = await Assignment.toggleAttesa(link.assignmentId, false, token);
        await this.changeLinkStatus(linkID, 'inactive');
        return assignmentRes;
    }

    public async activeLink(linkID: string, token: string) {
        const link = await linkRepository.findById(linkID);
        const assignmentRes = await Assignment.toggleAttesa(link.assignmentId, true, token);
        await this.changeLinkStatus(linkID, 'active');
        return assignmentRes;
    }

    public async changeLinkStatus(linkID: string, status: LinkStatus) {
        LOG.info('Changing link status to', status, linkID);
        return await linkRepository.updateStatus(linkID, status);
    }

    public async removeLink(linkID: string) {
        LOG.info('Removing link', linkID);
        return await linkRepository.delete(linkID);
    }

}