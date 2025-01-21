import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface TicketDetails {
  id: string;
  status: string;
  assignee: string;
  createdAt: Date;
  progress: number;
  description: string;
}

interface HistoryItem {
  date: Date;
  action: string;
  user: string;
}


@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticket-container">
      <div class="ticket-header">
        <h1 style="color: var(--dark-purple); margin: 0 0 1rem 0;">Ticket #{{ ticket.id }}</h1>
        <span class="status-badge">{{ ticket.status }}</span>
      </div>

      <div class="section">
        <div class="section-title">Assigned To</div>
        <div>{{ ticket.assignee }}</div>
      </div>

      <div class="section">
        <div class="section-title">Progress</div>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="ticket.progress"></div>
        </div>
        <div class="meta-info" style="margin-top: 0.5rem">{{ ticket.progress }}% Complete</div>
      </div>

      <div class="section">
        <div class="section-title">Created</div>
        <div class="meta-info">{{ ticket.createdAt | date:'medium' }}</div>
      </div>

      <div class="section">
        <div class="section-title">Description</div>
        <div class="description">{{ ticket.description }}</div>
      </div>

      <div class="section">
        <div class="section-title">History</div>
        <div class="history-timeline">
          <div class="history-item" *ngFor="let item of history">
            <div class="history-date">{{ item.date | date:'medium' }}</div>
            <div class="history-action">{{ item.action }}</div>
            <div class="meta-info">by <span class="history-user">{{ item.user }}</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DetailTicketComponent {
  ticket: TicketDetails = {
    id: 'TK-123',
    status: 'In Progress',
    assignee: 'John Doe',
    createdAt: new Date(2024, 0, 15, 9, 30),
    progress: 65,
    description: 'This is a sample ticket description that outlines the task details. It includes important information about what needs to be done and any specific requirements or considerations.',
  };

  history: HistoryItem[] = [
    {
      date: new Date(2024, 0, 15, 9, 30),
      action: 'Ticket created',
      user: 'Sarah Johnson'
    },
    {
      date: new Date(2024, 0, 15, 10, 15),
      action: 'Assigned to John Doe',
      user: 'Mike Anderson'
    },
    {
      date: new Date(2024, 0, 16, 14, 20),
      action: 'Status changed to In Progress',
      user: 'John Doe'
    },
    {
      date: new Date(2024, 0, 17, 11, 45),
      action: 'Progress updated to 65%',
      user: 'John Doe'
    }
  ];

}
