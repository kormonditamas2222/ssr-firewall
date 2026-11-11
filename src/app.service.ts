import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise'
import { Rule } from './Rule.js';


const mySqlConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "firewall"
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getRules() {
    const [results] = await mySqlConnection.execute("SELECT id, priority, mac, enabled FROM blocklist ORDER BY priority ASC");
    return results as Rule[];
  }

  async newRule(priority: number, mac: string, enabled: number) {
    await mySqlConnection.execute("INSERT INTO blocklist (priority, mac, enabled) VALUES (?,?,?)", [priority, mac, enabled]);
  }
}
