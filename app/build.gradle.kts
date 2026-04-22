plugins {
    application
    alias(libs.plugins.spotless)
    alias(libs.plugins.jlink)
}

group = "edu.thread_placing"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {}

testing {
    suites {
        val test by getting(JvmTestSuite::class) {
            useJUnitJupiter("6.0.3")
        }
    }
}

tasks.register<JavaExec>("runProfiled") {
    group = "application"

    mainClass.set(application.mainClass)
    classpath = sourceSets["main"].runtimeClasspath

    jvmArgs = listOf("-XX:StartFlightRecording=dumponexit=true,filename=app-recording.jfr,settings=profile,jdk.CPUTimeSample#enabled=true")
    standardInput = System.`in`
}

tasks.withType<JavaCompile>().configureEach {
    options.encoding = "UTF-8"
    options.compilerArgs.addAll(listOf("-Xlint:deprecation", "-Xlint:unchecked"))
}

tasks.named<JavaExec>("run") {
    standardInput = System.`in`
    jvmArgs = listOf("-Dfile.encoding=UTF-8")
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(25)
    }
}

spotless {
    java {
        googleJavaFormat()
    }
    kotlinGradle {
        ktlint()
    }
}

application {
    mainClass = "edu.thread_placing.App"
    mainModule = "edu.thread_placing"
}

jlink {
    options = listOf("--strip-debug", "--compress", "zip-6", "--no-header-files", "--no-man-pages")
    imageName = "thread_placing"

    launcher {
        name = "thread_placing"
    }
}
