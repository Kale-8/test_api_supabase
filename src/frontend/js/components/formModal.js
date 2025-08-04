import {getEntry, addEntry, updateEntry} from '../services/storage.js';

export const renderFormModal = async (tag, id = null) => {
    const isEdit = id !== null;
    const title = isEdit ? 'Edit Event' : 'Create Event';
    let event = null;

    if (isEdit) {
        try {
            event = await getEntry(id, 'events');
        } catch (error) {
            console.error('Error fetching event:', error);
            return;
        }
    }

    tag.innerHTML = `<section class="form-section">
        <form class="form-event">
            <h2>${title}</h2>

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter event name" 
                    value="${event?.name || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="Event description" required>${event?.description || ''}</textarea>
            </div>
            
            <div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" 
                    value="${event?.date || ''}" required>
                </div>
            
                <div class="form-group">
                    <label for="capacity">Capacity</label>
                    <input type="number" id="capacity" name="capacity" 
                    value="${event?.capacity || ''}" min="1" max="1000" step="1" required>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-save">Save</button>
            </div>
        </form>
    </section>`;

    const form = document.querySelector('.form-event');
    const cancelButton = document.querySelector('.btn-cancel');

    cancelButton.onclick = () => {
        history.pushState(null, null, '/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    form.onsubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const eventData = {
            name: formData.get('name'),
            description: formData.get('description'),
            date: formData.get('date'),
            capacity: formData.get('capacity')
        }

        try {
            if (isEdit) {
                await updateEntry(id, eventData, 'events');
                alertify.success('Event updated successfully');
            } else {
                await addEntry(eventData, 'events');
                alertify.success('Event created successfully');
            }
            history.pushState(null, null, '/dashboard');
            window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (error) {
            console.error('Error saving event:', error);
        }
    }
}