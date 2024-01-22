import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    Column,
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import * as bcrypt from 'bcrypt';
  
  @Entity('users')
  @Unique(['email'])
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @BeforeInsert()
    createUUID() {
      this.id = uuid();
    }
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }

  
    @Column({ type: 'datetime', name: 'created_at' })
    createdAt: Date;
  
    @BeforeInsert()
    insertCreatedAt() {
      this.createdAt = new Date();
    }
  
    @Column({
      type: 'datetime',
      name: 'updated_at',
      nullable: true,
      default: null,
    })
    updatedAt: Date;
  
    @BeforeUpdate()
    updateTimestamp() {
      this.updatedAt = new Date();
    }
  }