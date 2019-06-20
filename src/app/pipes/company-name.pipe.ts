import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companyName'
})

export class CompanyNamePipe implements PipeTransform {
    transform(userId: string, userData?: any) {
        if (userData) {
            for (const data of userData) {
                if (data.id === userId) {
                    if (data.company === null) {
                        return 'N/A';
                    }
                    return data.company;
                }
            }
        }
    }
}
