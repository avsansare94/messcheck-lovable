
interface PendingAction {
  id: string
  type: string
  data: any
  timestamp: number
}

interface StoredData {
  id: string
  type: string
  data: any
  timestamp: number
}

class OfflineManager {
  private pendingActions: PendingAction[] = []
  private storedData: StoredData[] = []

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

  storeData(type: string, data: any): void {
    const storedItem: StoredData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data,
      timestamp: Date.now()
    }
    
    this.storedData.push(storedItem)
    this.saveStoredDataToPersistence()
    console.log('Stored data:', storedItem)
  }

  getAllDataByType(type: string): any[] {
    return this.storedData
      .filter(item => item.type === type)
      .map(item => item.data)
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

  private saveStoredDataToPersistence(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stored-data', JSON.stringify(this.storedData))
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

      const storedDataStr = localStorage.getItem('stored-data')
      if (storedDataStr) {
        try {
          this.storedData = JSON.parse(storedDataStr)
        } catch (error) {
          console.error('Failed to load stored data:', error)
          this.storedData = []
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
