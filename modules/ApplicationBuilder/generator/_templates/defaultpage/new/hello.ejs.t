---
to: <%=filepath%><%=filename%>
---

<template>
    <div ref="templateRef">
        <ComponentTreeBase :view="pageconfig" :isPage="true" :contextid="1" />
    </div>


</template>


<script setup lang="ts">
<% if(typeof usehead == 'string'){ -%>
    import { useHead } from 'unhead'
    import { ref } from 'vue'
    import { Page } from 'alphautils/view/Page.ts'
    import  { ComponentTreeBase }  from 'alphaviewlibrary'
    useHead({
        <% if(typeof title == 'string'){ -%>
            'title': '<%=title%>',
        <% } -%>
        <% if(typeof usemeta == 'string'){ -%>
            meta: [
                <% if(typeof description == 'string'){ -%>
                    { name: 'description', content: '<%=description%>' },
                <% } -%>
                <% if(typeof keywords == 'string'){ -%>
                    { name: 'keywords', content: '<%=keywords%>' },
                <% } -%>
                <% if(typeof charset == 'string'){ -%>
                    { charset: '<%=charset%>' },
                <% } -%>
                <% if(typeof subject == 'string'){ -%>
                    { name: 'subject', content: '<%=subject%>' },
                <% } -%>
                <% if(typeof copyright == 'string'){ -%>
                    { name: 'copyright', content: '<%=copyright%>' },
                <% } -%>
                <% if(typeof language == 'string'){ -%>
                    { name: 'language', content: '<%=language%>' },
                <% } -%>
                <% if(typeof robots == 'string'){ -%>
                    { name: 'robots', content: '<%=robots%>' },
                <% } -%>
                <% if(typeof revised == 'string'){ -%>
                    { name: 'revised', content: '<%=revised%>' },
                <% } -%>
                <% if(typeof abstract == 'string'){ -%>
                    { name: 'abstract', content: '<%=abstract%>' },
                <% } -%>
                <% if(typeof topic == 'string'){ -%>
                    { name: 'topic', content: '<%=topic%>' },
                <% } -%>
                <% if(typeof summary == 'string'){ -%>
                    { name: 'summary', content: '<%=summary%>' },
                <% } -%>
                <% if(typeof Classification == 'string'){ -%>
                    { name: 'Classification', content: '<%=Classification%>' },
                <% } -%>
                <% if(typeof author == 'string'){ -%>
                    { name: 'author', content: '<%=author%>' },
                <% } -%>
                <% if(typeof designer == 'string'){ -%>
                    { name: 'designer', content: '<%=designer%>' },
                <% } -%>
                <% if(typeof replyto == 'string'){ -%>
                    { name: 'reply-to', content: '<%=replyto%>' },
                <% } -%>
                <% if(typeof owner == 'string'){ -%>
                    { name: 'owner', content: '<%=owner%>' },
                <% } -%>
                <% if(typeof url == 'string'){ -%>
                    { name: 'url', content: '<%=url%>' },
                <% } -%>
                <% if(typeof identifierURL == 'string'){ -%>
                    { name: 'identifier-URL', content: '<%=identifierURL%>' },
                <% } -%>
                <% if(typeof directory == 'string'){ -%>
                    { name: 'directory', content: '<%=directory%>' },
                <% } -%>
                <% if(typeof pagename == 'string'){ -%>
                    { name: 'pagename', content: '<%=pagename%>' },
                <% } -%>
                <% if(typeof category == 'string'){ -%>
                    { name: 'category', content: '<%=category%>' },
                <% } -%>
                <% if(typeof coverage == 'string'){ -%>
                    { name: 'coverage', content: '<%=coverage%>' },
                <% } -%>
                <% if(typeof distribution == 'string'){ -%>
                    { name: 'distribution', content: '<%=distribution%>' },
                <% } -%>
                <% if(typeof rating == 'string'){ -%>
                    { name: 'rating', content: '<%=rating%>' },
                <% } -%>
                <% if(typeof revisitafter == 'string'){ -%>
                    { name: 'revisit-after', content: '<%=revisitafter%>' },
                <% } -%>   
            ],
        <% } -%>
    })
<% } -%>

const templateRef = ref(null)
const pageconfig = <%- pageconfig%>

const page = new Page(
    pageconfig, 
    templateRef)
</script>


