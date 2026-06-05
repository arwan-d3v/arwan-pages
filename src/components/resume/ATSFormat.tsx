"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  contact: {
    flexDirection: 'row',
    gap: 10,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: 0.5,
    marginBottom: 8,
    color: '#000',
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  entrySub: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 2,
  }
});

export const ATSFormat = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <View style={styles.contact}>
          <Text>{data.personal.email}</Text>
          <Text>{data.personal.phone}</Text>
          <Text>{data.personal.location}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>{data.personal.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp: any, i: number) => (
          <View key={i} style={styles.entry}>
            <View style={styles.entryHeader}>
              <Text>{exp.position}</Text>
              <Text>{exp.period}</Text>
            </View>
            <Text style={styles.entrySub}>{exp.company}</Text>
            {exp.description.map((desc: string, j: number) => (
              <Text key={j} style={styles.bullet}>• {desc}</Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text>{data.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
);
