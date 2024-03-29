import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,private db:AngularFireDatabase) { }

  save(todo: Todo){
    return this.http.post<Todo>(this.baseUrl+'/todos.json',todo);
  }
  getAll(){
    let todos: Todo[] = [];
    return this.http.get<Todo[]>(this.baseUrl+'/todos.json')
                    .pipe(map(response=>{
                      for(let key in response){
                        todos.push({...response[key],id:key})
                      }
                      return todos;
                    }))
  }
  get(id:string){
    return this.http.get<Todo>(this.baseUrl + '/todos/' + id + '.json');
  }
  update(todo:Todo){
   return this.http.put<Todo>(this.baseUrl + '/todos/'+ todo.id +'.json', todo);

  }

}
