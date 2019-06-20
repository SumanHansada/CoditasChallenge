import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'location'
})

export class LocationPipe implements PipeTransform {
    transform(userId: string, userData?: any) {
        if (userData) {
            for (const data of userData) {
                if (data.id === userId) {
                    return data.location;
                }
            }
        }
    }
}
