type StoredData = {
  id: string
  type: string
  data: any
  timestamp: number
}

class OfflineManager {
  private db: IDBDatabase | null = null
  private dbName = "messcheck_offline_db"
  private storeName = "offline_data"
  private dbVersion = 1

  constructor() {
    this.initDB()
  }

  private initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db)
        return
      }

      if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported in this browser"))
        return
      }

      const request = window.indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = (event) => {
        reject(new Error("Error opening database"))
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id" })
          store.createIndex("type", "type", { unique: false })
          store.createIndex("timestamp", "timestamp", { unique: false })
        }
      }
    })
  }

  async storeData(data: StoredData): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], "readwrite")
        const store = transaction.objectStore(this.storeName)
        const request = store.put(data)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(new Error("Error storing data"))
      })
    } catch (error) {
      console.error("Error in storeData:", error)
      throw error
    }
  }

  async getData(id: string): Promise<StoredData | null> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], "readonly")
        const store = transaction.objectStore(this.storeName)
        const request = store.get(id)

        request.onsuccess = () => {
          resolve(request.result || null)
        }
        request.onerror = () => reject(new Error("Error getting data"))
      })
    } catch (error) {
      console.error("Error in getData:", error)
      throw error
    }
  }

  async getAllDataByType(type: string): Promise<StoredData[]> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], "readonly")
        const store = transaction.objectStore(this.storeName)
        const index = store.index("type")
        const request = index.getAll(type)

        request.onsuccess = () => {
          resolve(request.result || [])
        }
        request.onerror = () => reject(new Error("Error getting data by type"))
      })
    } catch (error) {
      console.error("Error in getAllDataByType:", error)
      throw error
    }
  }

  async removeData(id: string): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], "readwrite")
        const store = transaction.objectStore(this.storeName)
        const request = store.delete(id)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(new Error("Error removing data"))
      })
    } catch (error) {
      console.error("Error in removeData:", error)
      throw error
    }
  }

  async clearAllData(): Promise<void> {
    try {
      const db = await this.initDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.storeName], "readwrite")
        const store = transaction.objectStore(this.storeName)
        const request = store.clear()

        request.onsuccess = () => resolve()
        request.onerror = () => reject(new Error("Error clearing data"))
      })
    } catch (error) {
      console.error("Error in clearAllData:", error)
      throw error
    }
  }

  // Queue for offline actions
  async queueAction(action: { type: string; data: any }): Promise<void> {
    return this.storeData({
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "action_queue",
      data: action,
      timestamp: Date.now(),
    })
  }

  async getQueuedActions(): Promise<StoredData[]> {
    return this.getAllDataByType("action_queue")
  }

  async removeQueuedAction(id: string): Promise<void> {
    return this.removeData(id)
  }
}

// Create a singleton instance
const offlineManager = typeof window !== "undefined" ? new OfflineManager() : null

export default offlineManager
