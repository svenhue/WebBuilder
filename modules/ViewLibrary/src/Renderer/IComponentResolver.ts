import { Component } from 'vue';

export interface IComponentResolver{
    resolveComponent(name: string): Component
}