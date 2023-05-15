import { LOG } from "../../utils/Log";
import { LinkApi } from "../apis/LinkApi";
import { Link } from "../models/Link";
import { LinkRepository } from "../repositories/LinkRepository";

const linkRepository = new LinkRepository();

export class LinkService implements LinkApi {
    
    public async saveLink(linkData: { uuid: string, assignmentId: number }) {
        const equalLink = await this.getLink(linkData.uuid);
        if (equalLink) return equalLink;
        
        const newLink = new Link();
        newLink.uuid = linkData.uuid;
        newLink.status = 'active';
        newLink.assignmentId = linkData.assignmentId;
        const linkSaved = await linkRepository.save(newLink);
        newLink._id = linkSaved.insertedId;

        LOG.success('New link saved', newLink.uuid, newLink._id);
        return newLink;
    }

    public async getLink(linkUUID: string) {
        return await linkRepository.findOneByKeyValue('uuid', linkUUID);
    }

    public async changeLinkStatus(linkUUID: string, status: any) {
        LOG.info('Changing link status to', status, linkUUID);
        const link = await linkRepository.findOneByKeyValue('uuid', linkUUID);
        return await linkRepository.update(link._id, { ...link, status } as Link);
    }

    public async removeLink(linkUUID: string) {
        LOG.info('Removing link', linkUUID);
        const link = await linkRepository.findOneByKeyValue('uuid', linkUUID);
        return await linkRepository.delete(link._id);
    }

}