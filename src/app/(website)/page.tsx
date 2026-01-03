"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Code2,
  CheckCircle,
  Github,
  GitBranch,
  Terminal,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Theme-aware gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted dark:from-black dark:via-[#0A0A0A] dark:to-[#1A1A1A]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent dark:from-black/50"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-32">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
                Build Every Line,{" "}
                <span className="bg-gradient-to-r from-foreground/80 to-purple-600 dark:from-gray-300 dark:to-purple-500 bg-clip-text text-transparent">
                  Ship Every Day
                </span>
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground lg:text-2xl">
                Take control of your code, stay focused, and achieve more with
                every line generated.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg px-8 text-base font-medium"
                  >
                    Start Building Free
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Code Cards Foreground */}
            <div className="relative z-10 mt-20 flex justify-center">
              <div className="flex gap-4">
                {[
                  {
                    gradient:
                      "from-purple-500/20 to-blue-500/20 dark:from-purple-500/20 dark:to-blue-500/20",
                    border: "border-purple-500/30 dark:border-purple-500/30",
                  },
                  {
                    gradient:
                      "from-teal-500/20 to-cyan-500/20 dark:from-teal-500/20 dark:to-cyan-500/20",
                    border: "border-teal-500/30 dark:border-teal-500/30",
                  },
                  {
                    gradient:
                      "from-orange-500/20 to-red-500/20 dark:from-orange-500/20 dark:to-red-500/20",
                    border: "border-orange-500/30 dark:border-orange-500/30",
                  },
                  {
                    gradient:
                      "from-muted to-muted/50 dark:from-gray-500/20 dark:to-gray-700/20",
                    border: "border-border dark:border-gray-500/30",
                  },
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    className={`w-64 h-40 rounded-xl border-2 ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-sm shadow-2xl`}
                    initial={{ opacity: 0, y: 50, rotate: -5 + index * 2 }}
                    animate={{ opacity: 1, y: 0, rotate: -5 + index * 2 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    style={{ transform: `rotate(${-5 + index * 2}deg)` }}
                  >
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-6 bg-foreground/20 rounded"></div>
                        <div className="flex-1 h-4 bg-foreground/10 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                        <div className="h-3 bg-foreground/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Instant Code Generation at Your Fingertips
              </h2>
              <p className="text-muted-foreground text-lg">
                Say goodbye to delays, hello to instant code
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "Uptime",
                  value: "99.9%",
                  desc: "Ensuring reliability.",
                },
                {
                  label: "Projects",
                  value: "50K+",
                  desc: "Trusted by developers.",
                },
                {
                  label: "Generation Time",
                  value: "0.3s",
                  desc: "Lightning-fast results.",
                },
                {
                  label: "Faster",
                  value: "10x",
                  desc: "Redefining productivity.",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="text-muted-foreground text-sm mb-2">
                    {stat.label}
                  </div>
                  <div className="text-6xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Visualization Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Dashboard Visualization */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card rounded-xl border border-border p-6 shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">
                        Projects
                      </div>
                      <div className="text-3xl font-bold">127</div>
                    </div>
                    <div className="w-24 h-8 bg-muted rounded-full"></div>
                  </div>

                  {/* Bar Chart */}
                  <div className="space-y-2">
                    {[60, 45, 80, 35, 70, 50, 90, 40].map((height, index) => (
                      <div key={index} className="flex items-end gap-1">
                        <div
                          className={`flex-1 rounded ${
                            index === 2 ? "bg-foreground" : "bg-muted"
                          }`}
                          style={{ height: `${height}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Code, Your Status
                  <br />
                  —Live Updates Anytime
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Monitor your code generation progress in real time and take
                  immediate action when needed to stay fully productive.
                </p>
                <Link href="/sign-up">
                  <Button className="h-12 bg-card text-foreground hover:bg-card/80 border border-border rounded-lg px-8">
                    Start Building Free
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Generate Code Without
                  <br />
                  the Back-and-Forth
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Simplify code generation by letting AI handle the heavy
                  lifting. Say goodbye to endless debugging.
                </p>

                <ul className="space-y-4 mb-8">
                  {[
                    "Smart code generation",
                    "Multi-language support",
                    "Automated testing",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-foreground shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up">
                  <Button className="h-12 bg-card text-foreground hover:bg-card/80 border border-border rounded-lg px-8">
                    Start Building Free
                  </Button>
                </Link>
              </motion.div>

              {/* Right: Dashboard Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card rounded-xl border border-border p-6 shadow-2xl">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500"></div>
                      <span className="font-semibold">Frame AI</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-32 h-8 bg-muted rounded"></div>
                      <div className="w-8 h-8 bg-muted rounded"></div>
                    </div>
                  </div>

                  {/* Sidebar and Content */}
                  <div className="flex gap-4">
                    <div className="w-20 bg-muted rounded-lg p-3 space-y-3">
                      <div className="h-8 bg-muted-foreground/20 rounded"></div>
                      <div className="h-8 bg-foreground rounded"></div>
                      <div className="h-8 bg-muted-foreground/20 rounded"></div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted rounded-lg p-4">
                          <div className="text-muted-foreground text-xs mb-1">
                            Main Project
                          </div>
                          <div className="text-xl font-bold">42 files</div>
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <div className="text-muted-foreground text-xs mb-1">
                            Lines of Code
                          </div>
                          <div className="text-xl font-bold">12.4K</div>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-muted-foreground text-xs mb-2">
                          Code Generation Stats
                        </div>
                        <div className="h-32 bg-background rounded">
                          {/* Simple line graph representation */}
                          <svg className="w-full h-full" viewBox="0 0 200 100">
                            <polyline
                              points="0,80 30,70 60,50 90,40 120,30 150,25 180,20 200,15"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-foreground"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="bg-muted/30 dark:bg-[#121212] py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Works Everywhere
                <br />
                Across All Platforms
              </h2>
              <p className="text-muted-foreground text-lg">
                Frame AI works everywhere—effortless integration for development
              </p>
            </motion.div>

            {/* Central Graphic */}
            <div className="flex justify-center items-center relative h-96">
              {/* Central Layered Cubes */}
              <div className="relative z-10">
                {[0, 1, 2].map((layer) => (
                  <div
                    key={layer}
                    className="absolute w-32 h-32 border-2 border-foreground/30 rounded-lg"
                    style={{
                      transform: `translate(${layer * 8}px, ${
                        layer * 8
                      }px) rotate(${layer * 5}deg)`,
                      opacity: 1 - layer * 0.3,
                    }}
                  ></div>
                ))}
              </div>

              {/* Encircling Ring */}
              <div className="absolute w-80 h-80 border border-foreground/20 rounded-full"></div>

              {/* Connecting Lines */}
              <div className="absolute w-80 h-80">
                <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/20"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-foreground/20"></div>
              </div>

              {/* Platform Icons */}
              {[
                { icon: Github, position: "top-0 left-1/2 -translate-x-1/2" },
                {
                  icon: GitBranch,
                  position: "bottom-0 left-1/2 -translate-x-1/2",
                },
                { icon: Terminal, position: "left-0 top-1/2 -translate-y-1/2" },
                { icon: Code2, position: "right-0 top-1/2 -translate-y-1/2" },
              ].map(({ icon: Icon, position }, index) => (
                <div
                  key={index}
                  className={`absolute ${position} w-16 h-16 border border-foreground/30 rounded-full flex items-center justify-center bg-card backdrop-blur-sm`}
                >
                  <Icon className="w-8 h-8" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Trusted by Developers,
                <br />
                Loved by Teams
              </h2>
              <p className="text-muted-foreground text-lg">
                Developers trust us. Teams rave about us
              </p>
            </motion.div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                {/* Background Cards */}
                <motion.div
                  className="absolute inset-0 bg-muted rounded-xl border border-border opacity-50"
                  style={{
                    transform: "rotate(-3deg) translateX(-20px)",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute inset-0 bg-muted rounded-xl border border-border opacity-50"
                  style={{
                    transform: "rotate(3deg) translateX(20px)",
                  }}
                ></motion.div>

                {/* Main Card */}
                <motion.div
                  className="relative bg-card rounded-xl border border-border p-8 md:p-12"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <blockquote className="text-2xl md:text-3xl font-bold mb-6">
                    Frame AI has completely transformed the way we generate code
                    and build projects
                  </blockquote>
                  <p className="text-muted-foreground text-lg mb-8">
                    With its seamless code generation and real-time
                    collaboration, we&apos;ve seen a significant improvement in
                    both productivity and code quality.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      SJ
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Sarah Julian</div>
                      <div className="text-muted-foreground">
                        Lead Developer
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-12 h-2 bg-foreground rounded-full"></div>
              <div className="w-12 h-2 bg-muted border border-border rounded-full"></div>
              <div className="w-12 h-2 bg-muted border border-border rounded-full"></div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked
                <br />
                Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Have another question? Please contact our team!
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  What is Frame AI?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  Frame AI is an advanced code generation platform that helps
                  developers build, iterate, and deploy interactive web projects
                  with AI-powered assistance in real time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  How does Frame AI generate code?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  Frame AI uses advanced AI models to understand your
                  requirements and generate production-ready code across
                  multiple programming languages and frameworks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  Is Frame AI suitable for small teams?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  Yes! Frame AI is designed to scale with teams of all sizes,
                  from individual developers to large organizations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  What programming languages does Frame AI support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  Frame AI supports all major programming languages including
                  JavaScript, TypeScript, Python, React, Next.js, and many more
                  frameworks and libraries.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-card rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  Can Frame AI integrate with my existing development workflow?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  Absolutely! Frame AI integrates seamlessly with popular
                  development tools, version control systems, and deployment
                  platforms.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Banner Container */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="bg-card rounded-xl border border-border p-12 md:p-16 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Build Smarter with the
                <br />
                Platform Built for Developers
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Generate code, automate workflows, and ship faster with ease
              </p>
              <Link href="/sign-up">
                <Button className="h-12 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-lg px-8 text-base font-medium">
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Logo Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded"></div>
                <span className="text-2xl font-bold">Frame AI</span>
              </div>
            </div>

            {/* Navigation Columns */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    Our Vision
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Meet Our Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Code Generation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    AI Assistance
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Project Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Collaboration Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Privacy</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Data Protection
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              © Copyright Frame AI 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
