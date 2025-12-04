import { integer, pgTable, varchar, timestamp, date, text, numeric, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar().notNull(),
    email: varchar().notNull(),
    name: varchar().notNull(),
    image: varchar().notNull(),
    profilePicture: varchar().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});

// Enums
export const genderEnum = pgEnum("gender", ["Male", "Female", "Other"]);

// Teachers Table
export const teachers = pgTable("teachers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar().notNull(),
    middleName: varchar(),
    lastName: varchar().notNull(),
    contactNumber: varchar(),
    email: varchar().notNull(),
    profileImage: varchar(),
});

// Students Table
export const students = pgTable("students", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar().notNull(),
    middleName: varchar(),
    lastName: varchar().notNull(),
    address: text(),
    dateOfBirth: date(),
    gender: genderEnum(),
    lrn: varchar(),
});

// Grade Level Table
export const gradeLevel = pgTable("gradeLevel", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
});

// Classes Table
export const classes = pgTable("classes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    teacherId: integer().references(() => teachers.id),
    gradeLevelId: integer().references(() => gradeLevel.id),
    schoolYear: varchar().notNull(),
});

// Subjects Table
export const subjects = pgTable("subjects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    gradeLevelId: integer().references(() => gradeLevel.id),
});

// Grades Table
export const grades = pgTable("grades", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    gradeLevelId: integer().references(() => gradeLevel.id),
    subjectId: integer().references(() => subjects.id),
    classId: integer().references(() => classes.id),
    teacherId: integer().references(() => teachers.id),
    q1: numeric({ precision: 5, scale: 2 }),
    q2: numeric({ precision: 5, scale: 2 }),
    q3: numeric({ precision: 5, scale: 2 }),
    q4: numeric({ precision: 5, scale: 2 }),
    average: numeric({ precision: 5, scale: 2 }),
    remarks: varchar(),
});

// Class Students Junction Table
export const classStudents = pgTable("classStudents", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    classId: integer().references(() => classes.id).notNull(),
    studentId: integer().references(() => students.id).notNull(),
});

// Class Subjects Junction Table
export const classSubjects = pgTable("classSubjects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    classId: integer().references(() => classes.id).notNull(),
    subjectId: integer().references(() => subjects.id).notNull(),
    teacherId: integer().references(() => teachers.id).notNull(),
});
