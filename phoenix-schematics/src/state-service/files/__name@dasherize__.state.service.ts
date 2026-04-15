import { Injectable, signal } from '@angular/core';
import { <%= classify(name) %>ApiService } from './<%= dasherize(name) %>.api.service';

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>StateService {
private readonly apiService = inject(<%= classify(name) %>ApiService);
// État privé de la feature, exposé en lecture seule

private readonly state = {
    items: signal<any[]>([])
} as const;
readonly items = this.state.items.asReadonly();

fetchAll(): void {
    this.apiService.getAll().subscribe(items => { this.state.items.set(items); });
}
}