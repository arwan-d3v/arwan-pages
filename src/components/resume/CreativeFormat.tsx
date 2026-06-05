"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 30,
  },
  rightColumn: {
    width: '65%',
    padding: 30,
    backgroundColor: '#fff',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    border: '2 solid #CB2957',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#CB2957',
  },
  title: {
    fontSize: 10,
    marginBottom: 20,
    color: '#ccc',
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    borderBottom: 1,
    marginBottom: 8,
    paddingBottom: 2,
  },
  contentTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#CB2957',
    borderBottom: 1,
    marginBottom: 10,
    paddingBottom: 4,
  }
});

export const CreativeFormat = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.leftColumn}>
        {/* Simulation Photo Placeholder */}
        <View style={styles.photo} />

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Contact</Text>
          <Text>{data.personal.email}</Text>
          <Text>{data.personal.phone}</Text>
          <Text>{data.personal.location}</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Skills</Text>
          {data.skills.map((s: string, i: number) => (
            <Text key={i} style={{ marginBottom: 2 }}>• {s}</Text>
          ))}
        </View>

        <View style={{ marginTop: 'auto', alignItems: 'center' }}>
           <Text style={{ fontSize: 7, color: '#666' }}>ID_VERIFIED_PROTOCOL</Text>
           {/* QR Code Placeholder */}
           <View style={{ width: 40, height: 40, backgroundColor: '#fff', marginTop: 5 }} />
        </View>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <Text style={styles.title}>Software Engineer / Full-Stack Developer</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.contentTitle}>About Me</Text>
          <Text style={{ lineHeight: 1.4 }}>{data.personal.summary}</Text>
        </View>

        <View>
          <Text style={styles.contentTitle}>Work History</Text>
          {data.experience.map((exp: any, i: number) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold' }}>{exp.position}</Text>
                <Text style={{ color: '#666' }}>{exp.period}</Text>
              </View>
              <Text style={{ fontStyle: 'italic', color: '#CB2957', marginBottom: 4 }}>{exp.company}</Text>
              {exp.description.slice(0, 3).map((d: string, j: number) => (
                <Text key={j} style={{ marginLeft: 5, marginBottom: 1 }}>- {d}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
