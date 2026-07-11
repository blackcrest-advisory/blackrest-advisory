export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  description: string;
  metrics: ProjectMetric[];
  image: string;
}
