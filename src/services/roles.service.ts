import { authService } from './auth.service'
import { Roles } from '../models/roles.model'

class RolesService {

    private readonly url = 'http://192.168.0.20:3030/roles'

    private async getHeaders() {
        const sessionUser = await authService.getSessionUser()
        if (!sessionUser) throw new Error('User need to sign in')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionUser.token}`,
        }
    }

    private async getData(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return await response.json()
        }
        
        throw new Error('Session expired')
    }

    public async delete(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders(),
        })
        return await this.getData(response) as boolean
    }

    public async create(role: Roles) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify(role)
        })
        return await this.getData(response) as Roles
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        })
        return await this.getData(response) as Roles[]
    }

}

export const rolesService = new RolesService()