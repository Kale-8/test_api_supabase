import {getEntries, deleteEntry, addEntry, getEntry, updateEntry} from '../services/storage.js';
import {isAdmin, getCurrentUser} from '../services/auth.js';

export async function renderDashboard(tag) {
    const events = await getEntries('events');

    tag.innerHTML = `
        ${isAdmin() ? `<section class="top">
            <button class="btn-primary" id="btn-add-event">ADD NEW EVENT</button>
        </section>` : ''}
        <section class="table-container enroll">
            <table class="event-table">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Descripton</th>
                    <th>Capacity</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                ${events.map(event => `
                <tr>
                    <td><img src="https://picsum.photos/200" alt="Event picture"></td>
                    <td>${event.name}</td>
                    <td>${event.description}</td>
                    <td>${event.capacity}</td>
                    <td>${event.date}</td>
                    ${isAdmin() ? `<td><a class="icon" data-id="${event.id}" data-action="edit"><i class="fa-solid fa-pen"></i></a></td>
                    <td><a class="icon" data-id="${event.id}" data-action="delete"><i class="fa-solid fa-trash"></i></a></td>` :
        `<td><button class="${event.capacity === 0 ? 'btn-cancel' : 'btn-primary'} btn-visitor" data-id="${event.id}" data-action="enroll">${event.capacity === 0 ? 'Sold out' : 'Enroll'}</button></td>
                    <td></td>`}
                    
                </tr>
                `).join('')}
                </tbody>
            </table>
        </section>`

    if (isAdmin())
        tag.querySelector('#btn-add-event').onclick = () => {
            history.pushState(null, null, '/event/create');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }

    tag.querySelectorAll('[data-action]').forEach(button => {
        const id = button.dataset.id;
        if (button.dataset.action === 'delete' && isAdmin()) {
            button.onclick = async () => {
                await deleteEntry(id, 'events');
                await renderDashboard(tag);
                alertify.error('Event deleted successfully');
            };
        }
        if (button.dataset.action === 'edit') {
            button.onclick = () => {
                history.pushState(null, null, `/event/edit/${id}`);
                window.dispatchEvent(new PopStateEvent('popstate'));
            };
        }
        if (button.dataset.action === 'enroll' && !isAdmin()) {
            button.onclick = async () => {
                let getEvent = await getEntry(id, 'events');
                getEvent = getEvent[0];
                if (getEvent.capacity === 0) {
                    alertify.error('Event is sold out');
                    return
                }
                const enrollment = {
                    event_id: getEvent.id,
                    user_id: getCurrentUser().userId
                }
                await addEntry(enrollment, 'enrollments');
                alertify.success('Event enrolled successfully');
                await updateEntry(id, {...getEvent, capacity: --getEvent.capacity}, 'events');
                await renderDashboard(tag);
            };
        }
    });
}