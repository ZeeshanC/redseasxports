import { Injectable } from '@angular/core';
import { VariableService } from '../variable/variable.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private vars: VariableService
  ) { }

  get(name: string) {
    if (typeof window !== 'undefined') {
      let data: any = null;
      try {
        const item = localStorage?.getItem(name);
        if (item) {
          data = JSON.parse(item);
        }
      } catch (error) { }
      return data;
    }
  }

  delete(name: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  }

  getToken() {
    const user = this.get(`${this.vars.user_key}`);
    return user?.token || false;
  }

  add(name: string, data: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(data));
    }
  }

  getProperty(parent: string, child: string | number) {
    if (typeof window !== 'undefined') {
      let data: any = null;
      const item = localStorage?.getItem(parent);
      if (item) {
        data = JSON.parse(item);
      }
      return data ? data[child] : false;
    }
  }

  getParentCauseId() {
    if (typeof window !== 'undefined') {
      let user: any = localStorage?.getItem(`${this.vars.user_key}`);
      if (user) {
        user = JSON.parse(user);
      }
      switch (user?.user?.user_type) {
        case 'individual':
          return '20';
        case 'ngo':
          return '40';
      }
    }
  }

  check(name: string, data: any) {
    if (this.get(name)) {
      this.delete(name);
      this.add(name, data);
    } else {
      this.add(name, data);
    }
  }

  getFromSession(name: string) {
    if (typeof window !== 'undefined') {
      let data: any = null;
      const item = sessionStorage?.getItem(name);
      if (item) {
        data = JSON.parse(item);
      }
      return data || false;
    }
  }

  deleteFromSession(name: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(name);
    }
  }

  checkFromSession(name: string, data: any) {
    if (this.getFromSession(name)) {
      this.deleteFromSession(name);
      this.addSessionData(name, data);
    } else {
      this.addSessionData(name, data);
    }
  }

  addSessionData(name: string, data: any) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(name, JSON.stringify(data));
    }
  }

  getPropertyFromSession(parent: string, child: string) {
    if (typeof window !== 'undefined') {
      let data: any = null;
      const item = sessionStorage?.getItem(parent);
      if (item) {
        data = JSON.parse(item);
      }
      return data ? data[child] : false;
    }
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

}
