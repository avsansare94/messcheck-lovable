
interface PendingAction {
  id: string
  type: string
  data: any
  timestamp: number
}

class OfflineManager {
  private pendingActions: PendingAction[] = []

  addPendingAction(type: string, data: any): void {
    const action: PendingAction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data,
      timestamp: Date.now()
    }
    
    this.pendingActions.push(action)
    this.saveToPersistence()
    console.log('Added pending action:', action)
  }

  getPendingActions(): PendingAction[] {
    return [...this.pendingActions]
  }

  removePendingAction(id: string): void {
    this.pendingActions = this.pendingActions.filter(action => action.id !== id)
    this.saveToPersistence()
  }

  private saveToPersistence(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pending-actions', JSON.stringify(this.pendingActions))
    }
  }

  private loadFromPersistence(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pending-actions')
      if (stored) {
        try {
          this.pendingActions = JSON.parse(stored)
        } catch (error) {
          console.error('Failed to load pending actions:', error)
          this.pendingActions = []
        }
      }
    }
  }

  constructor() {
    this.loadFromPersistence()
  }
}

// Singleton instance
export const offlineManager = new OfflineManager()
export default offlineManager
